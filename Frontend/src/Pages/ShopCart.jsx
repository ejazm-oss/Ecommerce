import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiCubeFill } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import BannerSection from "../Components/Banner/BannerSection";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../redux/Slice/cartSlice";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ShopCart = () => {
  const dispatch = useDispatch();
  const { cartItems = [], loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  const updateQuantity = (productId, newQty) => {
    const item = cartItems.find((i) => i.product._id === productId);
    if (!item || item.quantity === newQty) return;

    dispatch(updateCartQuantity({ productId, quantity: newQty }))
      .unwrap()
      .then(() => {
        dispatch(getCartItems()); // <- 🔁 Re-fetch all cart data
        toast.success("Cart updated successfully");
      })
      .catch((error) => {
        toast.error(error?.message || "Failed to update cart");
      });
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId))
      .unwrap()
      .then(() => {
        toast.success("Item removed from cart");
      })
      .catch((error) => {
        toast.error(error.message || "Failed to remove item from cart");
      });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <section>
      <BannerSection title={"Shop Cart"} home={"Home"} shop={"Shop List"} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 px-4 md:px-10 lg:px-20">
        {/* Cart Items */}
        <div className="lg:col-span-2 p-6 rounded-lg">
          <div className="hidden md:grid grid-cols-5 gap-4 font-semibold py-2 border-b border-gray-300 pb-5">
            <p className="col-span-2">Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-5 gap-4 items-center border-b border-gray-300 last:border-0 py-5"
              >
                {/* Product Info */}
                <div className="col-span-2 flex items-center gap-4">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/product/product-photo/${item.product._id}`}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-3xl object-cover"
                  />
                  <h3 className="text-lg font-medium">{item.product.name}</h3>
                </div>

                {/* Price */}
                <span className="font-semibold text-gray-500">
                  ₹{item.product.price.toFixed(2)}
                </span>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                    className="px-2 py-1 bg-gray-200 rounded-full"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product._id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded-full"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Remove Button */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-lg">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Remove"
                  >
                    <RxCross1 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Your cart is empty.
            </p>
          )}
        </div>

        {/* Cart Summary */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
          <div className="border rounded-4xl p-7">
            <div className="p-6 border rounded-xl mb-3 flex items-center gap-8">
              <LiaShippingFastSolid size={35} />
              <div>
                <span className="text-sm text-gray-500">FREE</span>
                <h1 className="font-semibold">Enjoy The Product</h1>
              </div>
            </div>
            <div className="p-6 border rounded-xl mb-3 flex items-center gap-8">
              <PiCubeFill size={35} className="text-gray-400" />
              <div>
                <span className="font-semibold">Enjoy The Product</span>
                <p className="text-sm text-gray-500">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting.
                </p>
              </div>
            </div>
            <p className="text-gray-800 flex gap-2 items-center mt-6 mb-4 font-semibold">
              <SiTicktick /> You will save ₹504 on this order
            </p>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mt-3">Total</h3>
              <h3 className="text-xl font-bold mt-3">
                ₹{totalPrice.toFixed(2)}
              </h3>
            </div>
            <Link to={"/product/checkout"}>
              <button className="bg-black text-white w-full py-2 mt-4 rounded-lg cursor-pointer">
                PLACE ORDER
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCart;
