import React from "react";

const FashionSection = () => {
  return (
    <section className="bg-[#fdf6ec] md:py-12 py-6 px-6 lg:px-20">
      <div className="lg:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Image with Wavy Border */}
        <div className="relative">
          <div className="relative w-full md:max-w-xl mx-auto lg:mx-0">
            <img
              src="https://pixio-react.vercel.app/assets/women-D1DUgv5q.png"
              alt="Woman Collection"
              className="w-full h-full object-cover rounded-lg wave"
            />

            {/* Woman Collection Button */}
            <button className="absolute bottom-5 left-12 bg-white text-black hover:text-white cursor-pointer duration-300 px-4 py-2 rounded-lg border border-black hover:bg-black font-bold shadow-md transition md:text-md text-sm">
              Woman Collection
            </button>
          </div>
        </div>

        {/* Right: Text & Collection Cards */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold md:w-[70%]">
            Set Your Wardrobe With Our Amazing Selection!
          </h2>
          <p className="text-gray-600 mt-4 md:w-[70%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the...
          </p>

          {/* Collection Cards */}
          <div className="mt-10 pt-10 flex flex-wrap gap-6">
            {/* Child Fashion */}
            <div className="relative md:w-56 lg:w-64 bg-gray-200 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://pixio-react.vercel.app/assets/1-MTpS5Zei.png"
                alt="Child Fashion"
                className="w-full h-auto object-cover hover:scale-115 transition duration-500"
              />
              <button className="absolute bottom-5 left-5 bg-white text-black hover:text-white cursor-pointer duration-300 px-3 py-1 rounded-lg border border-black hover:bg-black font-semibold shadow-md transition">
                Child Fashion
              </button>
            </div>

            <div className="relative md:w-56 lg:w-64 bg-blue-200 rounded-2xl overflow-hidden shadow-md">
              <img
                src="https://pixio-react.vercel.app/assets/2-BcVNvWem.png"
                alt="Man Collection"
                className="w-full h-auto object-cover hover:scale-115 transition duration-500"
              />
              {/* Discount Badge */}
              <div className="absolute top-2 right-2 bg-yellow-300 text-black font-bold text-xs px-2 py-1 rounded-full shadow-md">
                50% Sale
              </div>
              <button className="absolute bottom-5 left-5 bg-white text-black hover:text-white cursor-pointer duration-300 px-3 py-1 rounded-lg border border-black hover:bg-black font-semibold shadow-md transition">
                Man Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FashionSection;
