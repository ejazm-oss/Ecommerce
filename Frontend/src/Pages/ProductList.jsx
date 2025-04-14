import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/Slice/productSlice";
import { getCategories } from "../redux/Slice/categorySlice";
import { FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { addToCart, getCartItems } from "../redux/Slice/cartSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);
  const { category: categories } = useSelector((state) => state.category);
  const { cartItems } = useSelector((state) => state.cart);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [addedMap, setAddedMap] = useState({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    dispatch(getCartItems());
    dispatch(getProduct());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceRange, selectedCategories]);

  const products = Array.isArray(product) ? product : [];

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const withinPrice = item.price <= priceRange;
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(item.category?._id);
    return matchesSearch && withinPrice && categoryMatch;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }))
      .unwrap()
      .then(() => {
        toast.success("Product added to cart successfully");
        setAddedMap((prev) => ({ ...prev, [productId]: true }));
      })
      .catch((error) => {
        toast.error(error || "Failed to add to cart");
      });
  };

  const isProductAdded = (productId) =>
    addedMap[productId] || cartItems.some((item) => item.product._id === productId);

  return (
    <div className="bg-[#fdf8f4] min-h-screen p-4 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4 space-y-6">
          <h3 className="text-xl font-semibold mb-2">Filters</h3>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full p-2 border rounded-lg pl-4"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Max Price: ₹{priceRange}
            </label>
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {categories?.map((cat) => (
                <div key={cat._id} className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id={cat._id}
                    checked={selectedCategories.includes(cat._id)}
                    onChange={() => toggleCategory(cat._id)}
                  />
                  <label htmlFor={cat._id} className="text-sm text-gray-700">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setSearchTerm("");
              setPriceRange(10000);
              setSelectedCategories([]);
            }}
            className="w-full bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-lg font-medium"
          >
            Reset Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
            All Products
          </h2>

          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center">No products match your filters.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <div
                  key={product._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-base font-semibold text-gray-800 mb-1">{product.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">Slim Fit Cotton Casual Shirt</p>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-lg font-bold text-[#d32f2f]">₹{product.price}</p>
                      <p className="text-sm text-gray-400 line-through">₹3598</p>
                      {/* <p className="text-sm text-[#e65100] font-semibold">(82% OFF)</p> */}
                    </div>
                    {/* <p className="text-xs text-[#d32f2f] font-semibold">Only Few Left!</p> */}
                
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      disabled={isProductAdded(product._id)}
                      className={`mt-4 w-full py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition ${
                        isProductAdded(product._id)
                          ? "bg-green-600 text-white"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      {isProductAdded(product._id) ? (
                        <>✔ Added</>
                      ) : (
                        <>
                          <FaShoppingCart /> Add To Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8 flex-wrap">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 rounded ${
                        currentPage === i + 1
                          ? "bg-black text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
