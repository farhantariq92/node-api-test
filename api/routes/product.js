const express = require('express');
const router = express.Router();
const multer = require('multer');

// const upload = multer({dest: 'uploads/'});


const storage = multer.diskStorage({
    destination: function(req, fie, cb) {

        cb(null, './uploads/');

    },
    filename: function(req, file, cb) {
        
        cb(null, new Date().toISOString() + file.originalname);

    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg') {

        cb(null, true);

    } else {

        cb(null, false);

    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const ProductCtrl = require('../app/product/ProductCtrl');

router.get('/products', ProductCtrl.getProducts);

router.post('/product', upload.single('productImage'), ProductCtrl.createProduct);

module.exports = router;