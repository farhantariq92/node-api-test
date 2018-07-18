const express = require('express');
const router = express.Router();

const ProductCtrl = require('../app/product/ProductCtrl');

// router.get('/product', ProductCtrl.getProducts);

router.get('/products', (req, res) =>{
    res.status(200).json({message: 'All products'});
});

router.post('/product', ProductCtrl.createProduct);

module.exports = router;