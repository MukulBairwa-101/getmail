const express = require('express');
const mailboxrouter = express.Router();

const {sendmail,sent,inbox,search,getOne,updateMail} = require("../controllers/mailboxController");

mailboxrouter.post("/sendmail",sendmail);
mailboxrouter.get("/inbox",inbox);
mailboxrouter.get("/sent",sent);
mailboxrouter.get("/getOne/:id",getOne);
mailboxrouter.get("/search",search);
mailboxrouter.post("/updateMail",updateMail);

module.exports = mailboxrouter;

