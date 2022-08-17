const router = require("express").Router();
const { transactionController } = require("../controller");

router.get("/inquiry", transactionController.getTransaction);
router.post("/confirm", transactionController.confirmTransaction);
router.get("/history", transactionController.getTransactionHistory);

module.exports = router;
