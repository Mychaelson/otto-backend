const { Op } = require("sequelize");
const { User } = require("../lib/sequelize");
const Service = require("./service");
const bcrypt = require("bcrypt");

class AuthService extends Service {
  static registerUser = async ({ full_name, username, email, password }) => {
    try {
      const isUsernameOrEmailTaken = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (isUsernameOrEmailTaken) {
        return this.handleError({
          statusCode: 400,
          message: "Username or Email has Been Taken",
        });
      }

      const hashPassword = bcrypt.hashSync(password, 5);

      const registerToDb = await User.create({
        username,
        email,
        password: hashPassword,
        full_name,
      });

      return this.handleSuccess({
        message: "Account Registered",
        statusCode: 201,
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

module.exports = AuthService;
