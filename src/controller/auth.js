const AuthService = require("../services/auth");

const authController = {
  registerUser: async (req, res) => {
    try {
      const serviceResult = await AuthService.registerUser(req.body);

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

module.exports = authController;
