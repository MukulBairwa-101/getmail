const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mail = require("../models/mail");

require('dotenv').config();


exports.generateAccessToken = (_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:'10m'})
}
exports.generateRefreshToken = (_id)=>{
    return jwt.sign({_id},process.env.JWT_REFRESH_SECRET)
}

exports.generateOtp = ()=>{
    let otp = Math.floor(100000 + Math.random() * 900000);
    return otp;

}

exports.send_email = (otp)=>{

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  let mailOptions = {
    from: `"Test" <${process.env.SENDER_MAIL}>`,
    to: otp.email,
    subject: 'Reset password OTP',
    text: '',
    html: `
              <div style="padding:10px ;  " >
                  <p>Hi ${otp.email} , </p>
                  <h2 style="color:gray;">Reset password </h2>
                  <p>This is your one time otp to reset your password</p>
                  <p> ${otp.code} </p>  

              </div>
          `,
  };
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
    } else {
      let newmail = new mail({
        from: process.env.SENDER_MAIL,
        to: otp.email,
        subject: 'Reset password OTP',
        body: otp.code,
      });
      await newmail.save();
      


    }
  });
  return true;

}



