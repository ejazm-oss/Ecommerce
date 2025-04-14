import React, { useEffect, useRef, useState } from "react";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/Slice/productSlice";
import { getCategories } from "../../redux/Slice/categorySlice";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const { category } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchCategory, setSearchCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { loading } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    shipping: "",
    photo: null,
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("quantity", formData.quantity);
    productData.append("shipping", formData.shipping === "true");
    productData.append("category", selectedCategory._id);
    if (formData.photo) {
      productData.append("photo", formData.photo);
    }

    try {
      await dispatch(createProduct(productData)).unwrap();
      toast.success("Product created successfully!");

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
      toast.error("Failed to create product");
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
      mode="create"
    />
  );
};

export default CreateProduct;
