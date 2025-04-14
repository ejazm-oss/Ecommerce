import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdMenu } from "react-icons/io";

const AdminMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="md:hidden fixed top-2 left-2 z-50">
        <button
          onClick={toggleSidebar}
          className="text-white bg-blue-600 p-2 rounded shadow-md"
        >
          {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`min-h-screen flex flex-col bg-gray-800 text-white w-64 fixed top-0 left-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="px-5 pt-14 py-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>

        <ul className="flex-grow">
          <li>
            <Link
              to="/admin/create-category"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Create Category
            </Link>
          </li>
          <li>
            <Link
              to="/admin/create-product"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Create Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/admin-order"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Order
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Users
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
