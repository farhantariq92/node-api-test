const express = require('express');
const multer = require('multer');

const ProductCtrl = require('../app/product/ProductCtrl');

const router = express.Router();

// const upload = multer({dest: 'uploads/'});

const storage = multer.diskStorage({

  destination: (req, fie, cb) => {

    cb(null, './uploads/');

  },

  filename: (req, file, cb) => {

    cb(null, new Date().toISOString() + file.originalname);

  }

});

const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'image/jpeg') {

    cb(null, true);

  } else {

    cb(null, false);

  }

};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

router.get('/products', ProductCtrl.getProducts);

router.post('/product', upload.single('productImage'), ProductCtrl.createProduct);

module.exports = router;
