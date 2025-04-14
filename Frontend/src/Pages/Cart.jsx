import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/Slice/cartSlice"; 
import { AiOutlineClose } from "react-icons/ai";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineLocalShipping } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cart = ({ isCartOpen, setCartOpen }) => {
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch,isCartOpen]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isCartOpen]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 z-40 bg-black opacity-70"></div>}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isCartOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg p-10 z-50 transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-hidden max-h-screen`}
      >
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-semibold border-b pb-2">
            Shopping Cart{" "}
            <span className="bg-black text-white rounded-full px-[9px] text-sm py-1">
              {cartItems.length}
            </span>
          </h2>
          <button onClick={() => setCartOpen(false)} className="cursor-pointer font-bold">
            <AiOutlineClose className="text-xl" />
          </button>
        </div>

        <div className="max-h-[60vh] space-y-4 p-2">
          {loading ? (
            <p>Loading...</p>
          ) : cartItems.length > 0 ? (
            cartItems?.slice(0, 3).map((item) => (
              <div key={item._id} className="flex items-center gap-4 border-b border-gray-300 pb-3">
                <img
                  src={`${import.meta.env.VITE_API_URL}/product/product-photo/${item.product._id}`}
                  alt={item.product.name}
                  className="w-18 h-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-md font-medium">{item.product.name}</h3>
                  <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-3">
                      <FaCircleMinus size={20} className="cursor-pointer" />
                      <span className="border rounded-full text-xs text-center w-6 py-[3px]">
                        {item.quantity}
                      </span>
                      <FaCirclePlus size={20} className="cursor-pointer" />
                    </div>
                    <span className="font-semibold">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <RxCross1 className="cursor-pointer hover:text-red-500 duration-500" size={20} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <div className="mt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <MdOutlineLocalShipping size={35} className="text-gray-500" />
            <p className="pb-2 w-[65%] font-semibold">Congratulations, you’ve got free shipping!</p>
          </div>
          <Link to={"/shop-cart"} onClick={() => setCartOpen(false)}>
            <button className="w-full mt-4 py-2 bg-black text-white rounded-md cursor-pointer">
              View Cart
            </button>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Cart;
