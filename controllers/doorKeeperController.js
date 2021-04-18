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
        .json({ msg: "Door keeper has been deleted successfully" });
    }

    res.status(404).json({ err: "Error while deleting" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server error");
  }
};
