import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../redux/Slice/productSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center text-xl font-medium mt-10">Loading...</div>
    );
  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">All Products</h2>

      {Array.isArray(product) && product.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.map((item) => (
            <Link
              to={`/admin/product/${item.slug}`}
              key={item._id}
              className="border border-gray-200 rounded-2xl p-4 shadow hover:shadow-lg transition duration-300 ease-in-out block"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/product/product-photo/${item._id}`}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <p className="text-gray-700 font-medium">₹{item.price}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No products found.</div>
      )}
    </div>
  );
};

export default Products;
