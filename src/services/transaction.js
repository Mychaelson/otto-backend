const axiosInstance = require("../lib/axiosInstance");
const { verifyToken } = require("../lib/jwt");
const Service = require("./service");

class TransactionService extends Service {
  static inquiryTransaction = async () => {
    try {
      const listOfTransaction = await axiosInstance.get(
        "/interview/biller/v1/list"
      );

      return this.handleSuccess({
        data: listOfTransaction.data.data,
        statusCode: 200,
        message: "Transaction Found",
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

module.exports = TransactionService;
