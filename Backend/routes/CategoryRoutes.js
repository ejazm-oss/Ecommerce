const express = require("express");
const ensureAuthenticated = require("../Middleware/Auth");
const { isAdmin } = require("../controllers/AuthController");
const {createCategoryController, updateCategory, getAllCategory, singleCategoryController, deleteCategory} = require("../controllers/CategoryController");

const router = express.Router();

router.post('/create-category', ensureAuthenticated, isAdmin, createCategoryController);
router.put('/update-category/:id', ensureAuthenticated, isAdmin, updateCategory);
router.delete('/delete-category/:id', ensureAuthenticated, isAdmin, deleteCategory);

router.get('/category', getAllCategory);
router.get('/single-category/:slug', singleCategoryController);


module.exports = router;