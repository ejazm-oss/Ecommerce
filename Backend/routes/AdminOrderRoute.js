const express = require("express");
const router = express.Router();

const ensureAuthenticated  = require('../Middleware/Auth');
const { isAdmin } = require("../controllers/AuthController");
const { getAllOrder, updateOrderStatus } = require("../controllers/AdminOrderController");

router.get('/admin/orders', ensureAuthenticated, isAdmin, getAllOrder);
router.put("/admin/order-status/:orderId", ensureAuthenticated, isAdmin, updateOrderStatus);

module.exports = router;