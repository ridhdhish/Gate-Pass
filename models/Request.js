const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: [true, "reason must be required"],
  },
  leave_date: {
    type: Date,
    required: [true, "Leave date must be required"],
  },
  leave_time: {
    type: String,
    required: [true, "Leave time must be required"],
  },
  return_date: {
    type: Date,
    required: [true, "Return date must be required"],
  },
  return_time: {
    type: String,
    required: [true, "Return time must be required"],
  },
  approved: {
    type: String,
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Userid must be required"],
  },
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
