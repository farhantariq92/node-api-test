const express = require('express');
const router = express.Router();

const ProductCtrl = require('../app/product/ProductCtrl');

router.get('/products', ProductCtrl.getProducts);

router.post('/product', ProductCtrl.createProduct);

module.exports = router;