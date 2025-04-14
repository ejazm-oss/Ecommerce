const Address = require("../models/AddressModel");

const AddressController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, phoneNumber, address, state, city, postalCode } =
      req.body;

    const newAddress = new Address({
      user: userId,
      fullName,
      phoneNumber,
      address,
      state,
      city,
      postalCode,
    });

    await newAddress.save();
    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const getUserAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const address = await Address.find({ user: userId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res.status(200).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
module.exports = { AddressController, getUserAddress};
