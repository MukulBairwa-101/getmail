const express = require('express');
const { body } = require('express-validator');
const authrouter = express.Router();

const {signup,signin,googleSignIn,verifyUser,refreshtoken,forgotPassword,verifyOtp,resetPassword} = require("../controllers/auth");





authrouter.post("/signup",[
    body('firstname').isLength(3).withMessage('Firstname must be a atleast 3 characters long'),
    body('lastname').isLength(3).withMessage('Lastname must be a atleast 3 characters long'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength(8).withMessage('Password should be of 8 characters')
],signup);

authrouter.post("/signin",[
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength(8).withMessage('Password should be of 8 characters')
],verifyUser,signin);


authrouter.post("/google",googleSignIn);



authrouter.post("/signin/refreshtoken",refreshtoken)

authrouter.post("/forgotpassword",[body('email').isEmail().withMessage('Email must be a valid email')],forgotPassword)
authrouter.post("/forgotpassword/twoway/verifyotp",verifyOtp)
authrouter.post("/resetpassword",resetPassword)

module.exports = authrouter;