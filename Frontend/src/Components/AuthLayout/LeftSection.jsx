import React from "react";
import { Link } from "react-router-dom";

const LeftSection = ({ title, subtitle, imgSrc, linkText1, linkTo1, linkText2, linkTo2 }) => {
  return (
    <div className="bg-[#f6e5cd] md:w-1/2 w-full pt-10 md:pt-16 flex flex-col items-center md:items-start text-center md:text-left">
      <h1 className="text-3xl md:text-4xl font-bold p-6 md:p-10 md:px-32">{title}</h1>
      <p className="text-gray-600 text-sm md:text-base px-6 md:px-32">{subtitle}</p>
      <div className="flex items-center gap-4 md:gap-6 px-6 md:px-32">
        <Link to={linkTo1} className="text-black font-semibold">
          {linkText1}
        </Link>
        <Link to={linkTo2} className="text-black font-semibold">
          {linkText2}
        </Link>
      </div>
      <img
        src={imgSrc}
        alt="Image"
        className="w-full md:w-auto max-w-xs md:max-w-lg m-auto"
      />
    </div>
  );
};

export default LeftSection;
