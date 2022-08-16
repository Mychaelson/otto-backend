const BalanceService = require("../services/balance");

const balanceController = {
  getBalance: async (req, res) => {
    try {
      const serviceResult = await BalanceService.getBalance(
        req.headers.authorization
      );

      if (!serviceResult.success) throw serviceResult;

      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },

  topUpBalance: async (req, res) => {
    try {
      const data = { token: req.headers.authorization, topUp: req.body.amount };
      const serviceResult = await BalanceService.topUpBalance(data);

      if (!serviceResult.success) throw serviceResult;

      return res.status(serviceResult.statusCode || 200).json({
        message: serviceResult.message,
        result: serviceResult.data,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = balanceController;
