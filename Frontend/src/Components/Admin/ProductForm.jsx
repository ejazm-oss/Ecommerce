import React from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/Slice/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductForm = ({
  formData,
  handleChange,
  handleSubmit,
  dropdownRef,
  searchCategory,
  setSearchCategory,
  isDropdownOpen,
  setIsDropdownOpen,
  filteredCategories,
  handleCategorySelect,
  selectedCategory,
  handlePhotoChange,
  loading = false,
  productId,
  mode = "create",
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success("Product deleted successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === "update" ? "Update Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            required
          />
        </div>

        {/* Price & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
              min={1}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              required
              min={1}
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div ref={dropdownRef} className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            value={searchCategory}
            onClick={() => setIsDropdownOpen(true)}
            onChange={(e) => {
              setSearchCategory(e.target.value);
              setIsDropdownOpen(true);
            }}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search category..."
            autoComplete="off"
            required
          />
          {isDropdownOpen && (
            <ul className="absolute left-0 right-0 z-10 mt-1 max-h-48 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <li
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    {cat.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400">No categories found</li>
              )}
            </ul>
          )}
        </div>

        {/* Shipping */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Shipping
          </label>
          <select
            name="shipping"
            value={formData.shipping}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Shipping Option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <label className="cursor-pointer inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-md border border-blue-300 hover:bg-blue-200">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              hidden
            />
          </label>
          {formData.photo ? (
            <>
              <div className="mt-2 text-sm text-gray-600">
                Selected:{" "}
                <span className="font-medium">{formData.photo.name}</span>
              </div>
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="New Upload Preview"
                className="mt-3 w-32 h-32 object-cover rounded border"
              />
            </>
          ) : (
            productId && (
              <img
                src={`${import.meta.env.VITE_API_URL}/product/product-photo/${productId}`}
                alt="Current Product"
                className="mt-3 w-32 h-32 object-cover rounded border"
              />
            )
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
            disabled={loading}
          >
            {loading
              ? mode === "update"
                ? "Updating..."
                : "Creating..."
              : mode === "update"
              ? "Update Product"
              : "Create Product"}
          </button>
          {mode === "update" && (
            <button
              type="button"
              onClick={() => handleDelete(productId)}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
            >
              Delete Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
