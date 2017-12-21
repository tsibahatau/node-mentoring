import db from "../models";
const { Product, Review } = db;

export default class ProductDAO {
  static getReviews(productId) {
    return Review.findAll({ where: { product_id: productId } });
  }

  static getProduct(id) {
    return Product.findOne({ where: { id } });
  }

  static getAllProducts() {
    return Product.findAll();
  }

  static createProduct(product) {
    return Product.build({
      name: product.name,
      brand: product.brand,
      price: product.price
    }).save();
  }
}
