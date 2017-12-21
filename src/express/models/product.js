import { Sequelize, DataTypes } from "sequelize";

export default class Product extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        brand: DataTypes.STRING,
        name: DataTypes.STRING,
        price: DataTypes.STRING
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.hasMany(models.Review, {
      foreignKey: "product_id"
    });
  }
}
/*
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
*/
