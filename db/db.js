const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// Database connection
const conn = process.env.DB_CONN;
module.exports = mongoose
  .connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
