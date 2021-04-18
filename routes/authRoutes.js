const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

const authController = require("../controllers/authController");

router.post("/auth/login", authController.login);
router.post("/auth/signup", authController.signup);
router.get("/auth/me", authMiddleware, authController.me);
router.post("/auth/checkOTP", authController.checkOTP);

module.exports = router;
