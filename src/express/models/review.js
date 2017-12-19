"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      text: DataTypes.STRING,
      author: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          Review.belongsTo(models.Product, { foreignKey: "product_id" });
        }
      }
    }
  );
  return Review;
};
