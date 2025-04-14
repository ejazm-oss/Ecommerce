import React from "react";
import AdminMenu from "./AdminMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="h-screen">
      
      <AdminMenu />

      <div className="flex-grow md:p-5 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
