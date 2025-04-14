const express = require('express');
const { placeOrder, getUserOrder, cancelOrder } = require('../controllers/OrderController');
const ensureAuthenticated = require("../Middleware/Auth");
const router = express.Router();

router.post("/place-order", ensureAuthenticated, placeOrder);

router.get('/my-orders', ensureAuthenticated, getUserOrder);

router.put('/cancel/:orderId', ensureAuthenticated, cancelOrder);

// router.get('/all', ensureAuthenticated, isAdmin, getAllOrders);

// router.put('/status/:orderId', ensureAuthenticated, isAdmin, updateOrderStatus);

module.exports = router;