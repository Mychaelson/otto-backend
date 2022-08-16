const { verifyToken } = require("../lib/jwt");
const { User } = require("../lib/sequelize");
const Service = require("./service");

class balanceService extends Service {
  static getBalance = async (token) => {
    try {
      const user = verifyToken(token);
      const userId = user.id;

      const balanceInfo = await User.findByPk(userId);

      return this.handleSuccess({
        data: {
          balance: balanceInfo.balance.toLocaleString(),
        },
        statusCode: 200,
        message: "User Balance Found",
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  static topUpBalance = async ({ token, topUp }) => {
    try {
      const user = verifyToken(token);
      const userId = user.id;

      const amount = parseInt(topUp);

      const findUser = await User.findByPk(userId);

      await User.update(
        {
          balance: findUser.balance + amount,
        },
        {
          where: {
            id: userId,
          },
        }
      );

      return this.handleSuccess({
        message: "Top Up Successful",
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };
}

module.exports = balanceService;
