const { DataTypes } = require("sequelize");

const Transaction = (sequelize) => {
  return sequelize.define("transaction", {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

module.exports = Transaction;
