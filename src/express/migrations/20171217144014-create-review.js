"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Reviews", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        text: {
          type: Sequelize.STRING
        },
        author: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        },
        product_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        }
      })
      .then(() =>
        queryInterface.addConstraint("Reviews", ["product_id"], {
          type: "FOREIGN KEY",
          name: "fkey_product_id",
          references: {
            table: "Products",
            field: "id"
          },
          onDelete: "cascade",
          onUpdate: "cascade"
        })
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Reviews");
  }
};
