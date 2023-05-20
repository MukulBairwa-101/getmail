const User = require("../models/user");
const Otp = require("../models/otp");
const { validationResult } = require("express-validator");
const {
  generateAccessToken,
  generateRefreshToken,
  generateOtp,
  send_email,
} = require("../util/utilFunctions");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

let refreshTokens = [];

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return;
    } else {
      await user.save();
      await res.status(200).json({
        status: true,
        message: "Sign up succesfully",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Error signing up",
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });

    let token, refreshToken;
    const matchPassword = async () => {
      return await bcrypt.compare(password, user.password);
    };

    if (user && (await matchPassword()) && user.email === email) {
      let _id = user._id;
      token = generateAccessToken(_id);
      refreshToken = generateRefreshToken(_id);

      refreshTokens.push(refreshToken);

      await res.status(201).json({
        status: true,
        user: {
          username: `${user.firstname} ${user.lastname}`,
          email: user.email,
          access_token: token,
          refresh_token: refreshToken,
        },
        message: "You are now signed in",
      });
    }
    else {
      res.status(200).json({
        status: false,
        message: "Credentials not match ",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Error signing in ",
    });
  }
};

exports.googleSignIn = async (req, res) => {
  try {
    let token, refreshToken;

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      token = generateAccessToken(user._id);
      refreshToken = generateRefreshToken(user._id);

      refreshTokens.push(refreshToken);

      await res.status(201).json({
        status: true,
        user: {
          username: `${user.firstname} ${user.lastname}`,
          email: user.email,
          access_token: token,
          refresh_token: refreshToken,
        },
        message: "Sign in successfully",
      });
    } else {
      const user = await new User({
        firstname: req.body.givenName,
        lastname: req.body.familyName,
        email: req.body.email,
        password: process.env.GOOGLE_SIGN_IN_USER_PASSWORD_SECRET,
      });

      await user.save();
      token = generateAccessToken(req.body.googleId);
      refreshToken = generateRefreshToken(req.body.googleId);

      refreshTokens.push(refreshToken);

      await res.status(201).json({
        status: true,
        user: {
          username: `${req.body.givenName} ${req.body.familyName}`,
          email: req.body.email,
          access_token: token,
          refresh_token: refreshToken,
        },
        message: "Sign in successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error signing in",
    });
  }
};

exports.refreshtoken = (req, res) => {
  const { token, _id } = req.body;
  try {
    if (!token) {
      res.status(401).json({
        status: false,
        message: "You are not authenticated",
      });
    }
    if (!refreshTokens.includes(token)) {
      res.status(401).json({
        status: false,
        message: "Refresh token is not valid",
      });
    }
    jwt.verify(token, `${process.env.JWT_REFRESH_SECRET}`, (err) => {
      refreshTokens = refreshTokens.filter((tokenItem) => {
        tokenItem !== token;
      });
      let newAccessToken = generateAccessToken(_id);
      let newRefreshToken = generateRefreshToken(_id);

      refreshTokens.push(newRefreshToken);

      res.status(200).json({
        status: true,
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      });
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      let otp = generateOtp();

      let otpCode = new Otp({
        email: email,
        code: otp,
        expiresIn: new Date(new Date().getTime() + 10 * 60000),
      });

      await otpCode.save();

      if (otpCode) {
        let mailResult = await send_email(otpCode);
        if (mailResult) {
          res.status(201).json({
            status: true,
            email: email,
            message: "Email sent successfully",
          });
        }
      }
    } else {
      res.status(404).json({
        status: false,
        message: "Email id does not exist",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  let otp = parseInt(req.body.otp);
  let email = req.body.email;
  try {
    let found = await Otp.findOne({ code: otp });

    if (found) {
      let currentTime = new Date().getTime();
      let otp_session = found.expiresIn - currentTime;
      if (otp_session < 0) {
        res.status(404).json({
          message: "OTP expired",
        });
      } else {
        res.status(200).json({
          status: true,
          email: email,
          message: "OTP verified",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { password, email } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      user.password = password;
      await user.save();

      await res.status(201).json({
        status: true,
        message: "Your password has been updated successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// middlewares

exports.verifyUser = (req, res, next) => {
  const header = req.headers.authorization;

  if (header) {
    jwt.verify(header, `${process.env.JWT_SECRET}`, (err) => {
      if (err) {
        res.status(401).json({
          message: "Token is not valid",
        });
      }
    });
  }

  next();
};
