const express = require('express');
const isAuth = require('../middleware/is-auth');

const orderController = require('../controllers/order.js');

const router = express.Router();

// POST /order
router.post('/order', isAuth, orderController.createOrder);

// GET /order/:userId
router.get('/orders/:userId', isAuth, orderController.getOrders);

// GET /order/:orderId
router.get('/order-detail/:orderId', isAuth, orderController.getOrderDetail);

module.exports = router;
