const router = require("express").Router();

const authController = require("../Controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/google", authController.googleLogin);

module.exports = router;
