export default class ProductDAO {
  constructor(products) {
    this.products = products;
  }

  getReviews(productID) {
    return this.products[productID]["reviews"] || [];
  }

  getProduct(productID) {
    return this.products[productID];
  }

  getAllProducts() {
    return this.products || [];
  }

  createProduct(product) {
    product.id = this.products.length;
    this.products.push(product);
    return product;
  }
}
