const DoorKeeper = require("../models/DoorKeeper");

module.exports.add = async (req, res) => {
  const { email, name } = req.body;
  try {
    const doorKeeper = await DoorKeeper.create({ email, name });

    res.status(200).json({ doorKeeper });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server error");
  }
};

module.exports.delete = async (req, res) => {
  const { email, name } = req.body;
  try {
    const doorKeeper = await DoorKeeper.findOneAndDelete({ email });

    if (doorKeeper) {
      return res
        .status(200)
        .json({ msg: "Door keeper has been deleted successfully", doorKeeper });
    }

    res.status(404).json({ err: "Error while deleting" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server error");
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const doorKeepers = await DoorKeeper.find({});

    res.status(200).json({ doorKeepers });
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = async (req, res) => {
  const { email } = req.body;
  try {
    const doorKeeper = await DoorKeeper.findOne({ email });
    if (doorKeeper) {
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
      const doorKeeper = await DoorKeeper.findOne({ email: req.body.email });

      if (doorKeeper) {
        const token = generateToken({
          email: doorKeeper.email,
          _id: doorKeeper._id,
        });
        return res.status(200).json({ doorKeeper, token });
      }

      return sendResponse(res, "Invalid Credentials", 404);
    } else {
      return sendResponse(res, "Invalid OTP", 404);
    }
  } catch (err) {
    console.log(err);
  }
};
