const router = require("express").Router();
const { transactionController } = require("../controller");

router.get("/inquiry", transactionController.getTransaction);

module.exports = router;
