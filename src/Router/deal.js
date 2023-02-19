const router = require("express").Router();
const dealController = require("../Controllers/dealHotController");

router.post("/create", dealController.createDealHot);
router.get("/search", dealController.search);
router.get("/:id", dealController.id);
router.delete("/:id", dealController.delete);
router.put("/:id", dealController.edit);
router.get("/", dealController.getAllDealHot);

module.exports = router;
