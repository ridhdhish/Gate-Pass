const { Router } = require("express");
const requestController = require("../controllers/requestController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.post("/", authMiddleware, requestController.makeRequest);
router.get("/", requestController.getAllRequest);
router.get("/getRequest/:id", authMiddleware, requestController.myRequests);
router.put("/", requestController.updateRequest);

module.exports = router;
