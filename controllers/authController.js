const User = require("../models/User");
const utils = require("../utils/sendResponse");
const fs = require("fs");
const path = require("path");
const base64Img = require("base64-img");
const imageToBase64 = require("image-to-base64");

const { generateToken } = require("../utils/createToken");
const { otpGenerator } = require("../utils/OTPGenerator");
const { main } = require("../utils/sendMail");

const sendResponse = utils.sendResponse;

// Signup api
module.exports.signup = async (req, res, next) => {
  const { email, mobile, name } = req.body;
  console.log(req.file);
  let base64Image;

  base64Image = await imageToBase64(
    path.join("uploads", "pic", req.file.filename)
  ); // Path to the image

  console.log(base64Image);

  try {
    fs.unlinkSync(path.join("uploads", "pic", req.file.filename));

    const user = await User.create({
      email,
      name,
      mobile,
      profilePic: base64Image,
    });

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return sendResponse(res, "Internal server error");
  }
};

// Login api
module.exports.login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const otp = otpGenerator();
      const isMailed = await main(otp, email);

      if (isMailed) {
        return res.status(200).json({
          msg: "OTP has been sent to your registered email address",
          otp,
        });
      }
    } else {
      return sendResponse(res, "Invalid Credentials", 404);
    }
  } catch (err) {
    console.log(err);
    return sendResponse(res, "Internal server error");
  }
};

// Check OTP
module.exports.checkOTP = async (req, res) => {
  console.log(req.body.myOTP, req.body.otp);
  try {
    if (req.body.myOTP === req.body.otp) {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        const token = generateToken({ email: user.email, _id: user._id });
        return res.status(200).json({ user, token });
      }

      return sendResponse(res, "Invalid Credentials", 404);
    } else {
      return sendResponse(res, "Invalid OTP", 404);
    }
  } catch (err) {
    console.log(err);
  }
};

// Me API
module.exports.me = async (req, res) => {
  try {
    console.log(req.user);
    res.json({ user: req.user });
  } catch (err) {
    console.log(err);
  }
};
