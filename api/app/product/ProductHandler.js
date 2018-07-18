const Product = require('./Product');


class ProductHandler {

    static async getAllProducts () {

        return Product.find().lean().exec();

    }

    static async createProduct(name, price) {

        const product = new Product({
            name,
            price
        });

        return product.save();

    }

}

module.export = ProductHandler;