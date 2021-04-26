const { Router } = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.put("/user", userController.updateUser);
router.delete("/user", userController.deleteUser);
router.get("/user", userController.getUser);
router.get("/user/getProfilePic", userController.getProfilePic);

module.exports = router;
