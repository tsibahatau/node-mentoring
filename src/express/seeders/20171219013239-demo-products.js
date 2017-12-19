"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          brand: "brand",
          name: "name",
          price: "123"
        },
        {
          brand: "brand1",
          name: "name1",
          price: "123"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Products",
      [{ name: ["name", "name1"] }],
      {}
    );
  }
};
