import React, { useState } from "react";
import LeftSection from "../Components/AuthLayout/LeftSection";
import Password from "../Components/Password/Password";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/Slice/authSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData,setFormData] = useState({name:"",email:"",password:"",phone:""});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const {isLoading, error, user} = useSelector((state) => state.auth);

  const handleChange = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(registerUser(formData));
      if (res.type === 'auth/registerUser/fulfilled') {
        toast.success(res.payload?.message || 'User registered successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error(res.payload?.error);
    }
  };  

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen md:gap-0 gap-8">
      <LeftSection
        title="Register"
        imgSrc="https://pixio-react.vercel.app/assets/pic3-Bx9Cp4Xz.png"
        linkText1="Home"
        linkTo1="/"
        linkText2="Register"
        linkTo2="/register"
      />
      <div className="w-full md:w-1/3 mx-auto border flex flex-col gap-4 items-center p-6 md:p-10 rounded-3xl shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">Create Account</h1>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
            className="border p-3 w-full rounded-xl outline-none text-sm md:text-base"
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            className="border p-3 w-full rounded-xl outline-none text-sm md:text-base"
          />

          <Password
            name="password"
            handleChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            pattern="\d{10}"
            maxLength="10"
            onChange={handleChange}
            required
            className="border p-3 w-full rounded-xl outline-none text-sm md:text-base"
          />
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center w-full">
            <button
              type="submit"
              className="border px-6 py-2 bg-black text-white font-semibold rounded-xl cursor-pointer hover:bg-gray-700 duration-300 w-full md:w-auto text-center"
            >
              REGISTER
            </button>

            <Link
              to="/login"
              className="border px-6 py-2 font-semibold rounded-xl cursor-pointer hover:bg-black hover:text-white duration-300 w-full md:w-auto text-center"
            >
              SIGN IN
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
