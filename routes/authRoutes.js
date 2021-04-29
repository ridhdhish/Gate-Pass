const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const multer = require("multer");

const router = Router();

const authController = require("../controllers/authController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/pic");
  },

  // add exptension
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// upload parameters for multer
const upload = multer({
  storage: storage,
});

router.post("/auth/login", authController.login);
router.post("/auth/signup", upload.single("profilePic"), authController.signup);
router.post("/auth/me", authMiddleware, authController.me);
router.post("/auth/checkOTP", authController.checkOTP);

module.exports = router;
