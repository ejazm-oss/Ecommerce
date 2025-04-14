import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../../redux/Slice/adminOrderSlice";
import moment from "moment";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const { adminOrderList, loading } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  return (
    <div className="p-4 md:p-10">
      <h2 className="text-2xl font-bold mb-6">All Orders (Admin)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          {adminOrderList.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow border">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">By: {order.user?.name} | {order.user?.email}</p>
                  <p className="text-sm text-gray-500">Placed: {moment(order.createdAt).format("DD MMM YYYY, h:mm A")}</p>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border rounded px-3 py-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-2">
                {order.products.map((item, idx) => (
                  <div key={idx} className="flex justify-between border-b py-1">
                    <p>{item.product.name} x {item.quantity}</p>
                    <p>₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrder;
