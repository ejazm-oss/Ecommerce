import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getUserOrders } from "../../redux/Slice/orderSlice";

const MyOrder = () => {
  const dispatch = useDispatch();
  const { orderList, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : orderList.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {orderList.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-xl p-6 shadow-sm"
            >
              <div className="mb-3 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Order ID:</span> {order._id}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Cancelled"
                      ? "bg-red-100 text-red-500"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-3">
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-3 last:border-none"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/product/product-photo/${item.product._id}`}
                        alt={item.product.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-700">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <p>
                  <span className="font-semibold">Payment:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {moment(order.createdAt).format("DD MMM YYYY, h:mm A")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
