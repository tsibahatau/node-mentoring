"use strict";
const bcrypt = require("bcrypt");
const SALT_ROUNDS = require("../constants").SALT_ROUNDS;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "test",
          password: bcrypt.hashSync("test", SALT_ROUNDS),
          email: "test@test.com"
        },
        {
          username: "test1",
          password: bcrypt.hashSync("test1", SALT_ROUNDS),
          email: "test1@test.com"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Users",
      [{ username: ["test", "test1"] }],
      {}
    );
  }
};
