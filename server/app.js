const express = require('express');
const app =  express();
const cors = require('cors');

const connect_db = require('./db/db');

const authrouter = require('./routes/authroutes');
const mailboxrouter = require('./routes/mailboxroutes');

require('dotenv').config();


app.use(express.json());
app.use(cors());
app.use("/auth",authrouter);

app.use("/mailbox",mailboxrouter)


connect_db();

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>console.log(`Server is running at http://${process.env.HOST}:${PORT}`));