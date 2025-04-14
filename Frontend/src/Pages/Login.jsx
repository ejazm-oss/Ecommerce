import React, { useState } from "react";
import LeftSection from "../Components/AuthLayout/LeftSection";
import Password from "../Components/Password/Password";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../redux/Slice/authSlice";
import { getCartItems } from "../redux/Slice/cartSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(formData));
      if (res.type === "auth/loginUser/fulfilled") {
        const user = res.payload;

        // 🔥 Immediately fetch cart after login
        dispatch(getCartItems());

        // Redirect based on admin status
        if (user.isAdmin) {
          toast.success("Admin Login successful");
          // Admin user, redirect to admin dashboard
          navigate("/admin/dashboard");
        } else {
          toast.success("Login successful");
          // Regular user, redirect to homepage
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen md:gap-0 gap-8">
      <LeftSection
        title="Login"
        imgSrc="https://pixio-react.vercel.app/assets/pic3-Bx9Cp4Xz.png"
        linkText1="Home"
        linkTo1="/"
        linkText2="Login"
        linkTo2="/login"
      />
      <div className="w-full md:w-1/3 mx-auto md:border flex flex-col gap-4 items-center p-6 md:p-10 rounded-3xl md:shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">Login</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            className="border p-3 w-full rounded-xl outline-none text-sm md:text-base"
          />
          <Password name="password" handleChange={handleChange} />
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center w-full">
            <button
              type="submit"
              className="border px-6 py-2 bg-black text-white font-semibold rounded-xl cursor-pointer hover:bg-gray-700 duration-300 w-full md:w-auto text-center"
            >
              SIGN IN
            </button>
            <Link
              to="/signup"
              className="border px-6 py-2 font-semibold rounded-xl cursor-pointer hover:bg-black hover:text-white duration-300 w-full md:w-auto text-center"
            >
              REGISTER
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
