const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin.js');

const router = express.Router();

// POST /admin/login
router.post('/login', adminController.login);

// GET /admin/products
router.get('/products', adminController.getProducts);

// GET /admin/dashboard
router.get('/dashboard', adminController.getDashboard);

// GET /admin/orders
router.get('/orders', adminController.getOrders);

// POST /admin/products
router.post(
  '/products',
  [
    body('name').trim().not().isEmpty(),
    body('category').trim().not().isEmpty(),
    body('price').trim().isFloat(),
    body('shortDesc').trim().isLength({ min: 10 }),
    body('description').trim().isLength({ min: 20 }),
  ],
  adminController.createProduct
);

// PUT /admin/products/:productId
router.put(
  '/products/:productId',
  [
    body('name').trim().not().isEmpty(),
    body('category').trim().not().isEmpty(),
    body('price').trim().isFloat(),
    body('shortDesc').trim().isLength({ min: 10 }),
    body('description').trim().isLength({ min: 20 }),
  ],
  adminController.updateProduct
);

// DELETE /admin/products/:productId
router.delete('/products/:productId', adminController.deleteProduct);

module.exports = router;
