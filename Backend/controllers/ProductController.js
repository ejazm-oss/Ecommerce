const { default: slugify } = require('slugify');
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');
const fs = require('fs');


const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (photo && photo.size > 1024 * 1024 * 5) {
      return res.status(400).json({
        success: false,
        message: 'Photo size should not exceed 5MB',
      });
    }

    const product = new Product({
      ...req.fields,
      slug: slugify(name, { lower: true }),
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    return res.status(201).json({
      success: true,
      message: 'Product Created Successfully',
      product,
    });

  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};


const getProduct = async (req,res) =>{
   try {
      const product = await Product.find({}).populate("category").select("-photo").limit(12).sort({createdAt:-1});
      if(!product){
         return res.status(404).json({
            message: 'Product not found'
         })
      }
      res.status(200).json({
         success: true,
         message: "All Products",
         product
      })
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "Internal Server Error", success: false,
    });
   }
}

const singleProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug }).populate("category").select("-photo");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single Product",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const productPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select("photo");
    if (!product || !product.photo.data) {
      return res.status(404).json({
        message: 'Photo not found',
      });
    }
    res.set('Content-type', product.photo.contentType);
    return res.status(200).send(product.photo.data);
  } catch (error) {
    console.error("Product Photo Error:", error);
    return res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId).select("-photo");
    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    if (!name || !description || !price || !quantity || !category) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (photo && photo.size > 1024 * 1024 * 5) {
      return res.status(400).json({
        success: false,
        message: 'Photo size should not exceed 5MB',
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.productId, {
      ...req.fields,
      slug: slugify(name, { lower: true }),
    }, { new: true });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    return res.status(201).json({
      success: true,
      message: 'Product Updated Successfully',
      product,
    });

  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}

const filterProduct = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    // If category is passed in query
    if (category) {
      const foundCategory = await Category.findOne({ name: category });
      if (!foundCategory) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
      filter.category = foundCategory._id;
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .select("-photo");

    res.status(200).json({
      success: true,
      message: "Filtered products",
      product: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};

module.exports = { createProduct, getProduct, singleProduct, productPhotoController, deleteProduct,updateProduct, filterProduct}; 