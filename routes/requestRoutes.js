const { Router } = require("express");
const requestController = require("../controllers/requestController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.post("/", authMiddleware, requestController.makeRequest);
router.get("/", requestController.getAllRequest);
router.post("/getRequest", authMiddleware, requestController.myRequests);
router.put("/", requestController.updateRequest);
router.delete("/", requestController.deleteRequest);
router.get("/:id", requestController.getRequest);

module.exports = router;
