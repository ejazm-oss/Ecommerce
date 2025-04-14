import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createCategory, getCategories, updateCategory } from '../../redux/Slice/categorySlice';

const CategoryForm = ({editMode, setEditMode, currentCategory}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.category);

  const [name, setName] = useState('');

  
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() =>{
     if(editMode && currentCategory){
       setName(currentCategory.name);
     }else{
      setName('');
     }
  },[editMode,currentCategory])

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!name.trim()) {
    toast.error("Category name is required!");
    return;
  }

  try {
    let result;
    if (editMode) {
      result = await dispatch(updateCategory({ id: currentCategory._id, name }));
      if (updateCategory.fulfilled.match(result)) {
        toast.success("Category updated successfully!");
        setEditMode(false);
        dispatch(getCategories());
      }
    } else {
      result = await dispatch(createCategory(name));
      if (createCategory.fulfilled.match(result)) {
        toast.success("Category created successfully!");
        dispatch(getCategories());
        setName("");
      }
    }

  } catch (error) {
    toast.error("Something went wrong! Please try again.");
  }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6"
    >

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter category name"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (editMode ? 'Updating...' : 'Creating...') : (editMode ? 'Update Category' : 'Create Category')}
        </button>
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setName('');
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
