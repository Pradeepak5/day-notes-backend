const UserModel = require("../models/users.model");
const { generateOTP, sendEmail } = require("../services/otp.service");
const { tokenGeneration } = require("../services/token.service");
const { httpCode, format, tokenExpiration, tokenPurpose } = require("../utils/constant")
const messages = require("../utils/messages")
const nodeCache = require("node-cache");
const otpCacheTTL = process.env.OTP_CACHE_TTL;
const otpCache = new nodeCache();

module.exports.signupSendOtp = async (req, res) => {
  try {
    const { email, userName } = req.body;
    const query = { email: { $regex: new RegExp('^' + email + '$', 'i') } };
    const isUserExists = await UserModel.findOne(query);
    if(isUserExists) {
      return res.status(httpCode.conflict).send(format.conflict(null, messages.userExist))
    }
    const otp = generateOTP()
    const token = await tokenGeneration({
      purpose: tokenPurpose.signup,
      email,
      userName
    }, tokenExpiration.verifySignup)
    const data = {
      otp,
      token,
      email,
      userName
    }
    otpCache.set(email, JSON.stringify(data), parseInt(otpCacheTTL))
    await sendEmail(email, messages.signupEmailSubject, messages.signupEmailText(otp))
    console.log(otpCache, 'otpCache')
    return res.status(httpCode.success).send(format.success({ token }, messages.otpSend));
  } catch (error){
    return res.status(httpCode.internalError).send(format.internalError(error, messages.internalError));
  }
}

module.exports.signupVerifyOtp = async (req, res) => {
  try {
    const { otp } = req.body
    const email = req.email
    if (!email) {
      return res.status(httpCode.unAuthorized).send(format.unAuthorized(null, messages.signupTokenUnauthorized))
    }
    const isValidUser = otpCache.get(email) ? JSON.parse(otpCache.get(email)) : null
    console.log(isValidUser)
    if (isValidUser?.otp != otp || isValidUser?.token !== req.token) {
      return res.status(httpCode.unAuthorized).send(format.unAuthorized(null, messages.invalidOtpUnauthorized))
    }
    const createUser = new UserModel({
      email: isValidUser.email,
      name: isValidUser.userName
    })

    const [loginToken] = await Promise.all([
      tokenGeneration({
      id: createUser._id,
      purpose: tokenPurpose.userAccess
      }, tokenExpiration.loginToken),
      createUser.save()
    ]);
    otpCache.del(email);
    return res.status(httpCode.success).send(format.success(loginToken, messages.successSignUp));
  } catch (error) {
    return res.status(httpCode.internalError).send(format.internalError(error, messages.internalError));
  }
}
