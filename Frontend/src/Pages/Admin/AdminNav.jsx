import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/Slice/authSlice";
import { toast } from "react-toastify";

const AdminNav = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleLogout = async () => {
      try {
            await dispatch(logout()); 
            toast.success("Logged out successfully"); 
            navigate('/login')
          } catch (error) {
            toast.error("Logout failed. Please try again."); 
          }
    };
  return (
    <div>
      <div className="relative group p-3">
        <div className="flex items-center justify-end cursor-pointer">
          <span className="bg-orange-400 text-white rounded-full px-[10px] py-1 text-sm font-semibold uppercase">
            {user?.name?.split(" ")[0][0]}
            {user?.name?.split(" ")[1]?.[0] || ""}
          </span>
          <IoIosArrowDown className="ml-1" />
        </div>

        {/* Dropdown */}
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-40 opacity-0 group-hover:opacity-100 group-hover:block hidden transition-opacity duration-300">
          <button
            onClick={handleLogout}
            className="block py-1 px-3 text-red-500 hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
