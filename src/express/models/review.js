import { Sequelize, DataTypes } from "sequelize";

export default class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: DataTypes.STRING,
        author: DataTypes.STRING
      },
      { sequelize }
    );
  }
  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: "product_id"
    });
  }
}
