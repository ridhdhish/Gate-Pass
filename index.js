const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const doorKeeperRoutes = require("./routes/doorKeeperRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(cors());

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
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api/doorkeeper", doorKeeperRoutes);
app.use("/api/request", requestRoutes);
app.get("/", (req, res) => res.send("Hello"));
