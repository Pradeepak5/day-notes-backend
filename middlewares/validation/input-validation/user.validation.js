const { httpCode, format } = require("../../../utils/constant")
const userInputSchema = require("../input-schema/user.schema")

module.exports.validateSignupSendOtp = (req, res, next) => {
  const { error } = userInputSchema.signupSendOtpSchema.validate(req.body)
  if (error) {
    return res.status(httpCode.unprocessEntity).send(format.unprocessEntity(null, error.message.replace(/"/g, '')))
  }
  return next()
}

module.exports.validateSignupVerifyOtp = (req, res, next) => {
  const { error } = userInputSchema.signupVerifyOtpSchema.validate(req.body)
  if (error) {
    return res.status(httpCode.unprocessEntity).send(format.unprocessEntity(null, error.message.replace(/"/g, '')))
  }
  return next()
}