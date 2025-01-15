const jwt = require("jsonwebtoken")
const { httpCode, format, tokenPurpose } = require("../../utils/constant")
const messages = require("../../utils/messages")
const userTokenSecret = process.env.USER_TOKEN_SECRET;

module.exports.verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader?.startsWith('Bearer ')) {
      const token = authorizationHeader.split(' ')[1]
      if (token) {
        const decoded = jwt.verify(token, userTokenSecret)
        if (decoded.purpose === tokenPurpose.signup) {
          req.email = decoded.email
          req.token = token
          next()
        } else if(decoded.purpose === tokenPurpose.userAccess) {
            next()
        } else {
          return responseHandler(res, Format.unAuthorized, 401, messages.UNAUTHORIZED_USER, null)
        }
      } else {
        return res.status(httpCode.notFound).send(format.notFound(null, messages.tokenNotFound))
      }
    } else {
      return res.status(httpCode.notFound).send(format.notFound(null, messages.tokenNotFound))
    }
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res.status(httpCode.unAuthorized).send(format.unAuthorized(null, messages.tokenExpired));
    }
    return res.status(httpCode.internalError).send(format.internalError(error, messages.internalError));
  }
}