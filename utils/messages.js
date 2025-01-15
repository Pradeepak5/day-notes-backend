module.exports = {
  otpSend: 'Otp Send Successfully',
  successSignUp: 'Welcome To DNA!',
  userExist: 'User Already Exists',
  tokenNotFound: 'Token Not Found',
  signupTokenUnauthorized: 'Unauthorized Token - Email Can`t Deduct',
  invalidOtpUnauthorized: 'Invalid Otp or Unauthorized Access',
  tokenExpired: 'Token Expired',
  signupEmailText: (otp) => `Use this code to signup with DayNotes & Achivements (DNA): ${otp}.\nThis code will expire in 5 minutes.`,
  signupEmailSubject: 'Signup Verification Code - DNA',
  internalError: 'Internal Server Error'
}