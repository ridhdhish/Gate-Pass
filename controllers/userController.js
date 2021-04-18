const User = require("../models/User");
const { sendResponse } = require("../utils/sendResponse");

/*
    route: PUT /user
    description: Update current user
*/
module.exports.updateUser = async (req, res) => {
  const { email, mobile, name, userId } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return sendResponse(res, "Unable to update user", 404);
    }

    if (email) user.email = email;
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return sendResponse(res, "Internal server error");
  }
};

/*
    route: DELETE /user
    description: Delete current user
*/
module.exports.deleteUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return sendResponse(res, "Unable to delete user", 404);
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return sendResponse(res, "Internal server error");
  }
};

/*
    route: GET /user
    description: Fetch current user
*/
module.exports.getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return sendResponse(res, "Unable to fetch user", 404);
    }

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return sendResponse(res, "Internal server error");
  }
};
