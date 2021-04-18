const Request = require("../models/Request");

module.exports.makeRequest = async (req, res) => {
  try {
    const request = await Request.create({ ...req.body });

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
    const requests = await Request.findById({ userId: req.body._id });

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
    request.save();

    res.status(200).json({ request });
  } catch (err) {
    console.log(err);
  }
};
