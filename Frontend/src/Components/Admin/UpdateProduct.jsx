import React, { useEffect, useRef, useState } from "react";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/Slice/categorySlice";
import { getProduct, singleProduct, updateProduct } from "../../redux/Slice/productSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const { slug } = useParams();

  const { category } = useSelector((state) => state.category);
  const { singleProduct: existingProduct, loading } = useSelector(
    (state) => state.product
  );

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchCategory, setSearchCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    shipping: "false",
    photo: null,
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(singleProduct(slug));
    dispatch(getProduct());
  }, [dispatch, slug]);

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        description: existingProduct.description,
        price: existingProduct.price,
        quantity: existingProduct.quantity,
        shipping: existingProduct.shipping ? "true" : "false",
        photo: null,
      });

      const matchedCat = category.find(
        (cat) => cat._id === existingProduct.category?._id
      );
      setSelectedCategory(matchedCat || null);
      setSearchCategory(matchedCat?.name || "");
    }
  }, [existingProduct, category]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCategories = category?.filter((cat) =>
    cat.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSearchCategory(cat.name);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("description", formData.description);
    updatedData.append("price", formData.price);
    updatedData.append("quantity", formData.quantity);
    updatedData.append("shipping", formData.shipping === "true");
    updatedData.append("category", selectedCategory._id);
    if (formData.photo) {
      updatedData.append("photo", formData.photo);
    }

    try {
      await dispatch(updateProduct({ id: existingProduct._id, updatedData })).unwrap();
      toast.success("Product updated successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        shipping: "false",
        photo: null,
      });
      setSelectedCategory(null);

      const fileInput = document.getElementById("photo-input");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  };

  return (
    <ProductForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      dropdownRef={dropdownRef}
      searchCategory={searchCategory}
      setSearchCategory={setSearchCategory}
      isDropdownOpen={isDropdownOpen}
      setIsDropdownOpen={setIsDropdownOpen}
      filteredCategories={filteredCategories}
      handleCategorySelect={handleCategorySelect}
      selectedCategory={selectedCategory}
      handlePhotoChange={handlePhotoChange}
      loading={loading}
      productId={existingProduct?._id}
      mode="update"
    />
  );
};

export default UpdateProduct;
