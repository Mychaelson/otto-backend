const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};

module.exports = User;
