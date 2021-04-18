const mongoose = require("mongoose");
const validator = require("validator");

const doorkeeperSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
  },
});

const Doorkeeper = mongoose.model("doorKeeper", doorkeeperSchema);

module.exports = Doorkeeper;
