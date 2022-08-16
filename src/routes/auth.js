const router = require("express").Router();
const { authController } = require("../controller");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/user-info", authController.userInfo);

module.exports = router;
