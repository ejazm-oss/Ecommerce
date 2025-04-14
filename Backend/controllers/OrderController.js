const Order = require("../models/OrderModel");

const placeOrder = async (req, res) => {
  try {
    const { addressId, products, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!addressId || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = new Order({
      user: userId,
      address: addressId,
      products,
      paymentMethod,
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Cancelled") {
      return res.status(404).json({ message: "Order is already cancelled" });
    }

    order.status = "Cancelled";
    await order.save();

    return res.status().json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.log("Cancel error", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate("products.product", "name price")
      .populate("address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { placeOrder, cancelOrder, getUserOrder};
