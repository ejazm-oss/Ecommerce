import React from "react";
import img1 from "/1.png";
import img2 from "/2.png";
import img3 from "/3.png";
import img4 from "/4.png";
import img5 from "/great.jpg"

const Testimonial = () => {
  const data = [
    {
      title: "Cozy Knit Cardigan Sweater",
      img: img1,
      price: "$80",
      MRP: "$95",
      discount: "Up To 20% OFF",
    },
    {
      title: "Sophisticated Swagger Suit",
      img: img2,
      price: "$70",
      MRP: "$95",
      discount: "Up To 10% OFF",
    },
    {
      title: "Classic Denim Skinny Jeans",
      img: img3,
      price: "$50",
      MRP: "$95",
      discount: "Up To 15% OFF",
    },
    {
      title: "Athletic Mesh Sports Leggings",
      img: img4,
      price: "$30",
      MRP: "$95",
      discount: "Up To 40% OFF",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between py-6">
      <div className="relative w-full lg:w-[40%] grid sm:grid-cols-2 gap-6 md:mx-20 md:px-0 px-10">
        {data.map((item, index) => (
          <div key={index} className="relative overflow-hidden rounded-2xl">
            <img src={item.img} alt={item.title} className="w-full object-cover hover:scale-110 transition-transform bg-cover h-72 duration-300" />
            <div className="absolute bottom-5 right-0 left-0 bg-white bg-opacity-75 px-4 py-2 flex flex-col mx-2 rounded-xl border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-red-500">{item.discount}</span>
                <span className="text-lg font-bold">{item.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">{item.title}</h4>
                <span className="text-sm text-gray-500 line-through">{item.MRP}</span>
              </div>
            </div>
          </div>
        ))}
         <span className="absolute -top-3 -right-3 bg-black text-white py-5 px-1 text-xs rounded-full hover:bg-gray-800 transition duration-300 ease-in md:block hidden">50% Sale</span>
      </div>
      <div className="w-full lg:w-auto flex justify-center md:justify-start leftWave">
        <img src={img5} alt="img" />
      </div>
    </div>
  );
};

export default Testimonial;
