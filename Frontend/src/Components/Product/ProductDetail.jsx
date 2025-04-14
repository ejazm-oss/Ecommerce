import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleProduct } from "../../redux/Slice/productSlice";

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { singleProduct: product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (slug) {
      dispatch(singleProduct(slug));
    }
  }, [slug, dispatch]);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  if (!product) return <div className="text-center mt-10">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 flex flex-col lg:flex-row gap-10 bg-white shadow-md rounded-xl">
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <img
          src={`https://e-commerce-six-orcin-70.vercel.app/product/product-photo/${product._id}`}
          alt={product.name}
          className="w-full h-96 object-cover rounded"
        />
      </div>

      {/* Product Info */}
      <div className="w-full lg:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-lg text-gray-600">{product.category?.name}</p>
        <p className="text-2xl font-bold text-black">₹{product.price}</p>
        <p className="text-gray-700">{product.description}</p>

        <div className="flex gap-4 mt-4">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
            Add to Cart
          </button>
          <button className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-gray-300 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
