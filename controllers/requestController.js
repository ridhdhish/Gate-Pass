const Request = require("../models/Request");
const QRCode = require("qrcode");
const { main } = require("../utils/sendQR");

module.exports.makeRequest = async (req, res) => {
  try {
    const request = await Request.create({
      ...req.body,
      email: req.user.email,
    });

    res.status(200).json({ request });
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
  const { requestApproval, requestId } = req.body;
  try {
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ msg: "Cannot find current request" });
    }

    request.approved = requestApproval;

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

      const url = await generateQR("Hello");
      request.imgBase64 = url;

      main(url, request.email);
    }

    request.save();

    res.status(200).json({ request });
  } catch (err) {
    console.log(err);
  }
};
