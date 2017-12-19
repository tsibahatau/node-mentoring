"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          text: "text",
          author: "author",
          product_id: 1
        },
        {
          text: "text1",
          author: "author1",
          product_id: 1
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Reviews",
      [{ author: ["author", "author1"] }],
      {}
    );
  }
};
