const User = require("../models/user");
const mail = require("../models/mail");
const mongoose = require("mongoose");

// const node_mailer = require('../util/utilFunctions');

const nodemailer = require("nodemailer");

require("dotenv").config();

exports.sendmail = async(req, res) => {
  const { email ,username } = req.query;

  console.log(req.query);

  const { to, subject, body } = req.body;
  try {

    let isUser =  await User.findOne({ email: to})

    if(!isUser) {
      res.status(404).json({ message: 'user not found' });
    }

    else {
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
        from: `"${req.query.username}" <${req.query.email}>`,
        to: to,
        subject: subject,
        text: body,
        html: `
                  <div style="padding:10px ; borderBottom: 1px solid #2C3333  " >
                      <h2 style="color:#2E4F4F;">${subject}</h2>
                      <p>Hi ${to} , </p>
                      <p> ${body} </p>   
                  </div>
              `,
      };

      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
        } else {
          let newmail = new mail({
            from: email,
            to: to,
            subject: subject,
            body: body,
            username:username
          });
          await newmail.save();
  
          await res.status(200).json({
            status: true,
            message: "Email sent successfully",
          });
        }
      });

    }   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.inbox = async (req, res) => {
  const { email } = req.query;

  try {
    let queryMails = await mail.find({ to: email });
    res.status(200).json({
      status: true,
      mails: queryMails,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

exports.sent = async (req, res) => {
  const { email } = req.query;

  try {
    let queryMails = await mail.find({ from: email });
    res.status(200).json({
      status: true,
      mails: queryMails,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

exports.search = async (req, res) => {
  const { searchKey, email } = req.query;

  try {
    let somedata = await mail.aggregate([
      {
        $match: {
          $or: [
            {
              from: email,
            },
            {
              to: email,
            },
          ],
        },
      },
      {
        $match: {
          $or: [
            {
              from: {
                $regex: searchKey,
                $options: "i",
              },
            },
            {
              to: {
                $regex: searchKey,
                $options: "i",
              },
            },
          ],
        },
      },
    ]);

    if (!somedata) {
      res.status(400).json("Not a Valid Search");
    } else {
      res.status(200).json({ status: true, filterdData: somedata });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  try {
    let oneMail = await mail.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: {
          isRead: true,
        },
      }
    );

    res.status(200).json({
      status: true,
      mail: oneMail,
    });

    // let oneMail =await mail.aggregate([
    //   {
    //     $match: {
    //       _id:mongoose.Types.ObjectId(id)
    //     },
    //   },
    //   {
    //     $set:{
    //       isRead:true
    //     }
    //   }
    // ])
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateMail = async (req, res) => {
  const { updates } = req.body;

  try {
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
