const express = require('express');
const { body } = require('express-validator');

const productController = require('../controllers/product.js');
const User = require('../models/user');

const router = express.Router();

// GET /products
router.get('/products', productController.getProducts);

// GET /product/:productId
router.get('/product/:productId', productController.getProductById);

module.exports = router;
