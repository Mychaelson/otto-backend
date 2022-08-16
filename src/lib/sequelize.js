const { Sequelize } = require("sequelize");
const mysqlConfig = require("../config/db");

const sequelize = new Sequelize({
  username: mysqlConfig.MYSQL_USERNAME,
  password: mysqlConfig.MYSQL_PASSWORD,
  database: mysqlConfig.MYSQL_DB_NAME,
  port: 3306,
  dialect: "mysql",
  logging: true,
});

const User = require("../models/user")(sequelize);

module.exports = {
  sequelize,
  User,
};
