const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: [true, "reason must be required"],
  },
  leave: {
    type: String,
    required: [true, "Leave date and time must be required"],
  },
  return: {
    type: String,
    required: [true, "Return date and time must be required"],
  },
  approved: {
    type: String,
    default: "pending",
  },
  email: {
    type: String,
    required: [true, "Email must be required"],
  },
  imgBase64: {
    type: String,
    default: "",
  },
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
