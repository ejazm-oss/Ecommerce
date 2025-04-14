import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { filterProductByCategory } from "../../redux/Slice/productSlice";
import { Link } from "react-router-dom"; 

const ProductsByCategory = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const category = params.get("category");

  const { filteredProduct, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (category) {
      dispatch(filterProductByCategory(category));
    }
  }, [category, dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        {category ? `${category} Products` : "All Products"}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : filteredProduct.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduct.map((p) => (
            <Link
              to={`/product/${p.slug}`} 
              key={p._id}
              className="p-4 border rounded-lg shadow hover:shadow-md block"
            >
              <img
                src={`https://e-commerce-dun-omega-14.vercel.app/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-64 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.category?.name}</p>
              <p className="text-black font-bold">₹{p.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsByCategory;
