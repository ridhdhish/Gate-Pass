const Request = require("../models/Request");
const User = require("../models/User");
const QRCode = require("qrcode");
const { main } = require("../utils/sendQR");

module.exports.makeRequest = async (req, res) => {
  try {
    const request = await Request.create({
      ...req.body,
      email: req.user.email,
    });

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ err: "cannot find user. Login again" });
    }

    user.isPending = true;
    user.save();

    res.status(200).json({ request, user });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllRequest = async (req, res) => {
  try {
    const requests = await Request.find({});

    res.status(200).json({ requests });
  } catch (err) {
    console.log(err);
  }
};

module.exports.myRequests = async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.user._id });

    res.status(200).json({ requests });
  } catch (err) {
    console.log(err);
  }
};

module.exports.updateRequest = async (req, res) => {
  const { requestApproval, requestId, email } = req.body;
  try {
    const request = await Request.findById(requestId);
    const user = await User.findOne({ email });

    if (!request) {
      return res.status(404).json({ msg: "Cannot find current request" });
    }

    request.approved = requestApproval;
    user.isPending = false;

    if (request.approved === "approved") {
      const generateQR = async (text) => {
        try {
          const url = await QRCode.toDataURL(text);
          console.log(url);
          return url;
        } catch (err) {
          console.error(err);
        }
      };

      const url = await generateQR(request._id.toString());
      request.imgBase64 = url;

      console.log(url);

      main(url, request.email);
    }

    request.save();
    user.save();

    res.status(200).json({ request });
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteRequest = async (req, res) => {
  try {
    const requests = await Request.deleteMany({});

    res.status(200).json({ msg: "All requests are deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getRequest = async (req, res) => {
  const requestId = req.query.id;
  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).send({ err: "Cannot find request" });
    }

    res.status(200).json({ request });
  } catch (err) {
    console.log(err);
  }
};
