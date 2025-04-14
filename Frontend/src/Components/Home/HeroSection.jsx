import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Electronics from "/Electronics.jpg";
import Clothing from "/Clothing.jpg";
import Mobile from "/Mobile.jpg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const sliderData = [
  {
    title: "Wireless Noise-Canceling Headphones",
    discount: "50% OFF",
    image: Electronics,
  },
  {
    title: "Elegant Yellow Summer Dress",
    discount: "15% OFF",
    image: Clothing,
  },
  {
    title: "Latest Mobile Phones",
    discount: "5% OFF",
    image: Mobile,
  },
];

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 text-gray-400 p-3 cursor-pointer"
    onClick={onClick}
  >
    <IoIosArrowForward size={24}/>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 text-gray-400 p-3 cursor-pointer"
    onClick={onClick}
  >
    <IoIosArrowBack size={24}/>
  </div>
);

const HeroSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {sliderData.map((slide, index) => (
          <div key={index} className="relative h-[80vh]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            ></div>

            {/* Text Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-white h-full text-center p-8">
              <h2 className="text-4xl md:text-6xl font-bold">{slide.title}</h2>
              <p className="text-lg md:text-2xl mt-2">Discount : {slide.discount}</p>
              <div className="mt-6 flex space-x-4">
                <button className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
                  ADD TO CART
                </button>
                <button className="border border-white px-6 py-3 rounded-lg font-semibold">
                  VIEW DETAILS
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
