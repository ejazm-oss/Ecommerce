const express = require('express');
const router = express.Router();

const {addToCart, getCartItems, updateCartQuantity, removeFromCart, clearCartController} = require('../controllers/CartController');
const ensureAuthenticated = require('../Middleware/Auth');

router.post('/add-to-cart', ensureAuthenticated, addToCart);

router.get("/cart-items", ensureAuthenticated, getCartItems);

router.put("/update-cart", ensureAuthenticated, updateCartQuantity);

router.delete("/remove-cart/:productId", ensureAuthenticated, removeFromCart);

router.delete("/clear-cart", ensureAuthenticated, clearCartController);

module.exports = router;