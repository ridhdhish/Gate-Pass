const { Router } = require("express");
const doorKeeperController = require("../controllers/doorKeeperController");

const router = new Router();

router.get("/", doorKeeperController.getAll);
router.post("/add", doorKeeperController.add);
router.delete("/delete", doorKeeperController.delete);

module.exports = router;
