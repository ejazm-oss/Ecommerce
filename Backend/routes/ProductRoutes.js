const express = require('express');
const ensureAuthenticated = require('../Middleware/Auth');
const { isAdmin } = require('../controllers/AuthController');
const { createProduct, getProduct, singleProduct, productPhotoController, deleteProduct, updateProduct, filterProduct } = require('../controllers/ProductController');
const formidable = require('express-formidable')
const router = express.Router();

router.post('/create-product', ensureAuthenticated, isAdmin, formidable(), createProduct);
router.get('/get-product', getProduct);
router.get('/single-product/:slug', singleProduct);
router.get('/product-photo/:productId', productPhotoController);
router.delete('/delete-product/:productId', ensureAuthenticated, isAdmin, deleteProduct);
router.put('/update-product/:productId', ensureAuthenticated, isAdmin, formidable(), updateProduct);
router.get('/filter-product', filterProduct)
module.exports = router;