import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../redux/Slice/AddressSlice";
import { toast } from "react-toastify";
import { placeOrder } from "../redux/Slice/orderSlice";
import { useNavigate } from "react-router-dom";
import { clearCart, clearCartBackend } from "../redux/Slice/cartSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems = [], loading } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [addressId, setAddressId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phoneNumber, postalCode, address, city, state } =
      formData;

    if (
      !fullName ||
      !phoneNumber ||
      !postalCode ||
      !address ||
      !city ||
      !state
    ) {
      return toast.error("Please fill in all fields");
    }

    const addressData = {
      fullName,
      phoneNumber,
      postalCode,
      address,
      city,
      state,
    };

    try {
      const response = await dispatch(addAddress(addressData)).unwrap();
      setAddressId(response._id);
      toast.success("Address saved successfully");
    } catch (error) {
      toast.error(err || "Failed to save address");
    }
  };

  const handlePlaceOrder = async () => {
    if (!addressId) {
      return toast.error("Please save an address before placing the order");
    }

    if (!paymentMethod) {
      return toast.error("Please select a payment method");
    }

    const orderData = {
      addressId,
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      paymentMethod,
    };

    try {
      const response = await dispatch(placeOrder(orderData)).unwrap();
      dispatch(clearCart());
      await dispatch(clearCartBackend()); 
      toast.success("Order placed Successfully");

      if (paymentMethod === "COD") {
        navigate("/order-success");
      } else {
        navigate("/payment");
      }
    } catch (error) {
      toast.error(error || "Failed to place order");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  return (
    <div className="min-h-screen p-4 md:p-8 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Billing Form */}
        <div className="md:col-span-2 h-[80vh] pr-4 p-6 space-y-4  rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Billing Details</h2>

          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            placeholder="Full Name"
            className="input-style"
          />
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            placeholder="Mobile"
            className="input-style"
          />
          <input
            type="text"
            name="address"
            onChange={handleChange}
            placeholder="Address Line"
            className="input-style"
          />
          <input
            type="text"
            name="state"
            onChange={handleChange}
            placeholder="State"
            className="input-style"
          />
          <input
            type="text"
            name="city"
            onChange={handleChange}
            placeholder="City"
            className="input-style"
          />
          <input
            type="text"
            name="postalCode"
            onChange={handleChange}
            placeholder="Pin Code"
            className="input-style"
          />

          <button
            onClick={handleAddressSubmit}
            className="bg-black text-white w-full py-2 rounded-xl hover:bg-gray-800"
          >
            Save Address
          </button>
        </div>

        {/* Place Order */}
        <div className="md:col-span-1 mt-6">
          <h1 className="mb-2 font-bold text-lg">Your Order</h1>
          <div className="sticky top-4 rounded-2xl border p-6 space-y-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b border-gray-300 py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://e-commerce-six-orcin-70.vercel.app/product/product-photo/${item.product._id}`}
                      alt={item.product.name}
                      className="w-14 h-14 rounded object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item.product.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p>SubTotal</p>
                <span className="font-bold">₹{totalPrice.toFixed(2)}</span>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>COD</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="Online"
                  checked={paymentMethod === "Online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Online Payment</span>
              </label>
            </div>

            {/* Place Order Button Here */}
            <button onClick={handlePlaceOrder} className="bg-black text-white w-full py-3 rounded-xl hover:bg-gray-800">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
