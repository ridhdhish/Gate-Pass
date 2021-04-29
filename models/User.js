const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  name: {
    type: String,
  },
  mobile: {
    type: Number,
    required: [true, "Mobile field is required. Cannot be null/empty"],
  },
  profilePic: {
    type: String,
  },
  isPending: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
