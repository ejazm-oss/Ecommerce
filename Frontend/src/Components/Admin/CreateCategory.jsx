import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories, updateCategory } from '../../redux/Slice/categorySlice';
import CategoryForm from './CategoryForm';
import { toast } from 'react-toastify';

const CreateCategory = () => {
  const dispatch = useDispatch();

  const { category, loading, error } = useSelector((state) => state.category);

  const [editMode,setEditMode] = useState(false);
  const [currentCategory,setCurrentCategory] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // useEffect(() => {
  //   if (category.length) {
  //     console.log("Fetched Categories:", category);
  //   }
  // }, [category]);

  const handleDelete = async (id) => {
    const result = await dispatch(deleteCategory(id)); 

    if (deleteCategory.fulfilled.match(result)) {
          toast.success('Category deleted successfully!');
          setName('');
          dispatch(getCategories());
        } else {
          toast.error(result.payload?.error || result.payload?.message || 'Something went wrong!');
        }
  };

  const handleEdit = (cat) =>{
     setEditMode(true);
     setCurrentCategory(cat);
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">Manage Categories</h1>

      {loading && <p className="text-gray-600 mb-4">Loading...</p>}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <CategoryForm
      editMode={editMode}
      setEditMode={setEditMode}
      currentCategory={currentCategory}/>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold">Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category?.map((category) => (
              <tr key={category._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4 text-sm sm:text-base">{category.name}</td>
                <td className="py-3 px-4 space-x-2">
                  <button onClick={()=> handleEdit(category)} className="bg-blue-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(category._id)} className="bg-red-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {category?.length === 0 && !loading && (
              <tr>
                <td colSpan="2" className="py-4 px-4 text-center text-gray-500">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateCategory;
