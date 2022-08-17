const axiosInstance = require("../lib/axiosInstance");
const { verifyToken } = require("../lib/jwt");
const { Transaction } = require("../lib/sequelize");
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

  static confirmTransaction = async (transactionId, token) => {
    try {
      const user = verifyToken(token);
      const userId = user.id;

      const transaction = await axiosInstance.get(
        `/interview/biller/v1/detail?billerId=${transactionId}`
      );

      const transactionDetailData = transaction.data.data;

      const createTransaction = await Transaction.create({
        category: transactionDetailData.category,
        product: transactionDetailData.product,
        description: transactionDetailData.description,
        price: transactionDetailData.price,
        fee: transactionDetailData.fee,
        isPaid: true,
        userId,
      });

      return this.handleSuccess({
        statusCode: 200,
        message: "Transaction Confirm",
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
