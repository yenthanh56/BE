const router = require("express").Router();

const userPayMentController = require("../../Controllers/PayMentUser/PayMentUserController");

router.post("/create", userPayMentController.createOrder);
router.get("/", userPayMentController.getAllUserOrder);
router.get("/:id", userPayMentController.getAnUser);
router.delete("/:id", userPayMentController.deleteUserOrder);

module.exports = router;
