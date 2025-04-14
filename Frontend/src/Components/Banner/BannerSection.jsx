import React from "react";
import img from "/shopcart-banner.jpg";
import { Link } from "react-router-dom";

const BannerSection = ({title,home,shop}) => {
  return (
    <div className="relative w-full h-[40vh] mt-28">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
        }}
      ></div>
      <img src={img} className="w-full h-full object-cover" alt="banner" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl text-white font-semibold">{title}</h1>
        <p className="text-white text-lg mt-2">
          <Link to={"/"}>{home} </Link>
          {">"} {shop}
        </p>
      </div>
    </div>
  );
};

export default BannerSection;
