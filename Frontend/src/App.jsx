import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ShopCart from "./Pages/ShopCart";
import Product from "./Components/Product/Product";
import AdminPrivateRoute from "./Components/ProtectedRoutes/AdminPrivateRoute";
import Profile from "./Pages/Profile";
import PrivateRoute from "./Components/ProtectedRoutes/PrivateRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import CreateProduct from "./Components/Admin/CreateProduct";
import Users from "./Components/Admin/Users";
import CreateCategory from "./Components/Admin/CreateCategory";
import AdminNav from "./Pages/Admin/AdminNav";
import Products from "./Components/Admin/Products"
import UpdateProduct from "./Components/Admin/UpdateProduct";
import ProductsByCategory from "./Components/Product/ProductsByCategory";
import ProductDetail from "./Components/Product/ProductDetail";
import CheckoutPage from "./Pages/CheckoutPage";
import Address from "./Pages/Address";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
import MyOrder from "./Components/OrderSuccess/MyOrder";
import AdminOrder from "./Pages/Admin/AdminOrder";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/admin/");

  return (
    <>
      {!isDashboard ? <Navbar /> : <AdminNav/>}

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial="initial" animate="animate" exit="exit" variants={pageVariants}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<PrivateRoute><Product /></PrivateRoute>} />
            <Route path="/shop-cart" element={<PrivateRoute><ShopCart /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/product" element={<PrivateRoute><ProductsByCategory /></PrivateRoute>} />
            <Route path="/product/:slug" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
            <Route path="/product/checkout" element={<PrivateRoute><CheckoutPage/></PrivateRoute>}/>
            <Route path="/address" element={<PrivateRoute><Address/></PrivateRoute>}/>
            <Route path="/order-success" element={<PrivateRoute><OrderSuccess/></PrivateRoute>}/>
            <Route path="/payment" element={<PrivateRoute><OrderSuccess/></PrivateRoute>}/>
            <Route path="/myOrder" element={<PrivateRoute><MyOrder/></PrivateRoute>}/>

            
            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>}>
              <Route path="create-category" element={<CreateCategory />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="product/:slug" element={<UpdateProduct />} />
              <Route path="products" element={<Products />} />
              <Route path="users" element={<Users />} />
              <Route path="admin-order" element={<AdminOrder/>}/>
            </Route>
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!isDashboard && <Footer />}
    </>
  );
};

export default App;
