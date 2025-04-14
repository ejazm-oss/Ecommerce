const Category = require('../models/CategoryModel');
const slugify = require('slugify');

// Create Category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = new Category({ name, slug });
    await newCategory.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });

  } catch (error) {
    console.error("Create Category Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred",
      error: error.message,
    });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name, { lower: true, strict: true }) },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });

  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating category",
      error: error.message,
    });
  }
};

// Get All Categories
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      success: true,
      data: categories,
    });

  } catch (error) {
    console.error("Get All Categories Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal error occurred",
      error: error.message,
    });
  }
};

// Get Single Category by Slug
const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Single category fetched successfully",
      data: category,
    });

  } catch (error) {
    console.error("Single Category Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching category",
      error: error.message,
    });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    console.error("Delete Category Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting category",
      error: error.message,
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategory,
  getAllCategory,
  singleCategoryController,
  deleteCategory,
};
