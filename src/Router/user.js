const router = require("express").Router();
const userController = require("../Controllers/userController");

router.delete("/:id", userController.deleteId);
router.get("/", userController.getAllUser);

module.exports = router;
