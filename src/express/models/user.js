import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants";

export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
      },
      { sequelize }
    );
  }

  isPasswordValid(passwordInput) {
    return bcrypt.compare(passwordInput, this.password).then(result => {
      return result ? this : null;
    });
  }

  hashPasswordBeforeSave(password, options) {
    return bcrypt
      .hash(password, SALT_ROUNDS)
      .then(hash => (this.password = hash));
  }
}
