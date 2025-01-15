const Joi = require("joi")

module.exports.signupSendOtpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid Email format.',
    'any.required': 'Email is required.'
  }),
  userName: Joi.string().required().messages({
    'any.required': 'UserName is required.'
  })
})

module.exports.signupVerifyOtpSchema = Joi.object({
  otp: Joi.number().required().messages({
    'any.required': 'OTP is required.'
  })
})