var express = require('express');
const userController = require('../controllers/user.controller');
const tokenAuth = require('../middlewares/auth/user.auth');
const inputAuth = require('../middlewares/validation/input-validation/user.validation');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to User Route');
});

router.post('/signup-send-otp', inputAuth.validateSignupSendOtp, userController.signupSendOtp);
router.post('/signup-verify-otp', inputAuth.validateSignupVerifyOtp, tokenAuth.verifyToken, userController.signupVerifyOtp)

module.exports = router;
