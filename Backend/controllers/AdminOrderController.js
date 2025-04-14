const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const Address = require("../models/AddressModel");

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") 
      .populate("products.product", "name price") 
      .populate("address") 
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Admin Get Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching orders",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllOrder, updateOrderStatus };
