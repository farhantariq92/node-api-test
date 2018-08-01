const ProductHandler = require('./ProductHandler');

class ProductCtrl {

  static async getProducts (req, res) {

    try {

      const products = await ProductHandler.getAllProducts();

      res.status(200).json({
        success: true,
        products
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message
      });

    }

  }

  static async createProduct (req, res) {

    console.log(req.file);

    try {

      const product = await ProductHandler.createProduct(req.body.name, req.body.price, req.file.path);

      res.status(200).json({
        success: true,
        message: 'Product successfully created',
        product
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message
      });

    }

  }

}

module.exports = ProductCtrl;
