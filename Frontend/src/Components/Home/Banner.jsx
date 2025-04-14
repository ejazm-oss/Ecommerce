import React, { useRef } from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Slider from "react-slick";

const Banner = () => {
  const sliderRef = useRef(null);

  const productData = [
    {
      title: "Shirts",
      image: "https://pixio-react.vercel.app/assets/1-ZtXoPDqG.png",
    },
    {
      title: "Sports",
      image: "https://pixio-react.vercel.app/assets/2-BO-y5aBJ.png",
    },
    {
      title: "T-Shirt",
      image: "https://pixio-react.vercel.app/assets/3-DBbcP1Z0.png",
    },
    {
      title: "Jeans",
      image: "https://pixio-react.vercel.app/assets/4-CmHDjemF.png",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows:false,
    responsive:[
      {
        breakpoint: 480,
        settings: {
          slidesToShow:3
        }
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow:2
        }
      },

    ]
  };

  return (
    <section className="flex flex-col md:flex-row">
      {/* Slider Section */}
      <div className="md:w-[65%] flex gap-8 items-center justify-center bg-[#FEEB9D] md:p-12 p-6">
        <Slider ref={sliderRef} {...settings} className="w-full max-w-4xl">
          {productData.map((item, index) => (
            <div
              key={index}
              className="!flex flex-col justify-center items-center h-[250px] w-full"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[130px] h-[150px] object-contain rounded-lg mb-4"
              />
              <h4 className="border border-gray-700 px-5 py-1 cursor-pointer font-semibold bg-white rounded-full hover:text-red-400 transition duration-300">
                {item.title}
              </h4>
            </div>
          ))}
        </Slider>
      </div>

      {/* Featured Categories Section */}
      <div className="bg-black p-8 flex flex-col gap-4 md:w-[35%] w-full text-center md:text-left">
        <h2 className="text-white text-3xl font-bold w-full md:w-[50%] px-4">
          Featured Categories
        </h2>
        <p className="text-white text-sm w-full md:w-[50%] px-4">
          Explore our latest collections, inspired by your favorite brands.
        </p>

        {/* Slide Control Buttons */}
        <div className="flex justify-center md:justify-start gap-4 mt-2 px-2">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="text-gray-400 hover:text-gray-200 duration-300 cursor-pointer transition"
          >
            <IoIosArrowRoundBack size={38}/>
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="text-gray-400 hover:text-gray-200 duration-300 cursor-pointer transition"
          >
            <IoIosArrowRoundForward size={38} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
