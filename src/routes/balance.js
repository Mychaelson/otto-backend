const router = require("express").Router();
const { balanceController } = require("../controller");

router.get("/balance-info", balanceController.getBalance);

module.exports = router;
