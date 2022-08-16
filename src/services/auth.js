const { Op } = require("sequelize");
const { User } = require("../lib/sequelize");
const Service = require("./service");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/jwt");

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

  static loginUser = async ({ credential, password }) => {
    try {
      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ email: credential }, { username: credential }],
        },
      });

      if (!findUser) {
        return this.handleError({
          statusCode: 400,
          message: "Username or Password is wrong",
        });
      }

      const comparePassword = bcrypt.compareSync(password, findUser.password);

      if (!comparePassword) {
        return this.handleError({
          statusCode: 400,
          message: "Username or Password is wrong",
        });
      }

      delete findUser.dataValues.password;

      const token = generateToken({ id: findUser.id });

      return this.handleSuccess({
        data: { user: findUser, token },
        statusCode: 200,
        message: "User Logged In",
      });
    } catch (err) {
      console.log(err);
      return this.handleError({
        message: "Server Error",
        statusCode: 500,
      });
    }
  };

  // static userInfo = async (userId) => {
  //   try {
  //     const user
  //   } catch (err) {
  //     console.log(err);
  //     return this.handleError({
  //       message: "Server Error",
  //       statusCode: 500,
  //     });
  //   }
  // }
}

module.exports = AuthService;
