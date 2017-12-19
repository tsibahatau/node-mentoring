"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      brand: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          Product.hasMany(models.Review, { foreignKey: "product_id" });
        }
      }
    }
  );
  return Product;
};
