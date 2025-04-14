import React from "react";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";

const Password = ({name,handleChange}) => {
  return (
    <div className="flex items-center justify-between border pr-3 w-full rounded-xl overflow-hidden">
      <input
        type="password"
        placeholder="Password"
        name={name}
        onChange={handleChange}
        className=" w-full rounded-xl outline-none p-3"
      />
      <span className="cursor-pointer"><FaRegEye size={20}/></span>
      {/* <span><IoEyeOffSharp /></span> */}
    </div>
  );
};

export default Password;
