const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

const addToCart = async (req,res) =>{
  try {
    const {productId, quantity} = req.body;
    const userId = req.user._id;
    
    const product = await Product.findById(productId);
    if(!product) {
      return res.status(404).json({message: "Product not found"});
    }

    let cartItem = await Cart.findOne({user: userId, product: productId});

    if(cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        user: userId,
        product: productId,
        quantity: quantity,
      });
      await cartItem.save();
    }
    res.status(200).json({success: true, message: "Product added to cart", cartItem});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Server error"});
  }
}

const getCartItems = async (req, res) => {
    try {
        const userId = req.user._id;
        const cartItems = await Cart.find({ user: userId }).populate('product');

        res.status(200).json({ success: true, cartItems});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const cartItem = await Cart.findOne({ user: userId, product: productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const result = await Cart.findOneAndDelete({ user: userId, product: productId });

    if (!result) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const clearCartController = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user._id });
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
};




module.exports = {addToCart, getCartItems, updateCartQuantity, removeFromCart, clearCartController};