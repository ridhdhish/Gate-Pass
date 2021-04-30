const { Router } = require("express");
const doorKeeperController = require("../controllers/doorKeeperController");

const router = new Router();

router.get("/", doorKeeperController.getAll);
router.post("/add", doorKeeperController.add);
router.delete("/delete", doorKeeperController.delete);
router.post("/login", doorKeeperController.login);
router.post("/checkOTP", doorKeeperController.checkOTP);

module.exports = router;
