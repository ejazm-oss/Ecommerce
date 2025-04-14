import React from "react";
import sale1 from "/sale1.png";
import sale2 from "/sale2.png";

const Sale = () => {
  return (
    <div className="mt-4 py-8">
      <div className="flex flex-col lg:flex-row">
        {/* First Sale Section */}
        <div className="relative w-full lg:w-1/2">
          <img src={sale1} alt="sale" className="w-full h-auto object-cover rounded-lg" />
          <div className="absolute right-5 top-5 sm:right-10 md:top-3 sm:top-1/4 xl:top-10 bg-white border p-4 sm:p-8 rounded-full w-52 h-52 xl:w-64 xl:h-64 sm:w-64 sm:h-64 flex flex-col items-center justify-center text-center shadow-lg">
            <p className="text-xs sm:text-sm font-medium text-gray-500">
              SALE UP TO 50% OFF
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-gray-700">SUMMER</h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">2024</h1>
            <button className="mt-3 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 border border-black rounded-lg hover:bg-black hover:text-white transition cursor-pointer duration-100 ease-in">
              SHOP NOW
            </button>
          </div>
        </div>
        
        {/* Second Sale Section */}
        <div className="relative w-full lg:w-1/2">
          <img src={sale2} alt="sale" className="w-full h-auto object-cover" />
          <div className="absolute left-5 sm:left-10 top-5 sm:top-0 p-4 sm:p-8 flex flex-col gap-2 sm:gap-4 items-start">
            <p className="text-xs sm:text-sm font-medium text-gray-500">
              SALE UP TO 50% OFF
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold w-[90%] sm:w-[95%] leading-tight">
              NEW SUMMER COLLECTION
            </h2>
            <button className="mt-2 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-black hover:bg-gray-800 text-white transition cursor-pointer">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;