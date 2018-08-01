const Product = require('./Product');

class ProductHandler {

  static async getAllProducts () {

    return Product.find().lean().exec();

  }

  static async createProduct (name, price, productImage) {

    const product = new Product({
      name,
      price,
      productImage
    });

    return product.save();

  }

}

module.exports = ProductHandler;
