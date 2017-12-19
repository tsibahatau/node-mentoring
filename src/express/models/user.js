"use strict";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  User.prototype.isPasswordValid = function(passwordInput) {
    return bcrypt.compare(passwordInput, this.password).then(result => {
      const user = result ? this : null;
      return user;
    });
  };

  User.prototype.hashPasswordBeforeSave = function(password, options) {
    return bcrypt
      .hash(password, SALT_ROUNDS)
      .then(hash => (this.password = hash));
  };
  return User;
};
