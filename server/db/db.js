const mongoose = require("mongoose");
require("dotenv").config();

// setting mongoose connection params

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const DB_URL = `${process.env.DB_ENDPOINT}/${process.env.DB_NAME}`;

const connect_db = () => {
  mongoose
    .connect(DB_URL, connectionParams)
    .then(() => console.log(`${process.env.DB_NAME} connection established`))
    .catch(()=>console.log(`${process.env.DB_NAME} connection not established`));
};

module.exports = connect_db