const router = require("express").Router();
const { balanceController } = require("../controller");

router.get("/balance-info", balanceController.getBalance);
router.post("/top-up", balanceController.topUpBalance);

module.exports = router;
