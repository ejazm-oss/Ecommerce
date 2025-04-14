import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">Thank you for shopping with us.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default OrderSuccess;
