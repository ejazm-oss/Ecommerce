import React from "react";
import img1 from "/1.png";
import img2 from "/2.png";
import img3 from "/3.png";
import img4 from "/4.png";
import img5 from "/5.png";
import img6 from "/6.png";
import img7 from "/7.png";
import img8 from "/8.png";

const Card = () => {
  const cardData = [
    {
      title: "Cozy Knit Cardigan Sweater",
      img: img1,
      price: "$80",
      discount: "GET 20% OFF",
    },
    {
      title: "Sophisticated Swagger Suit",
      img: img2,
      price: "$70",
      discount: "GET 10% OFF",
    },
    {
      title: "Classic Denim Skinny Jeans",
      img: img3,
      price: "$50",
      discount: "GET 15% OFF",
    },
    {
      title: "Athletic Mesh Sports Leggings",
      img: img4,
      price: "$30",
      discount: "GET 40% OFF",
    },
    {
      title: "Vintage Denim Overalls Shorts",
      img: img5,
      price: "$55",
      discount: "GET 25% OFF",
    },
    {
      title: "Satin Wrap Party Blouse",
      img: img6,
      price: "$65",
      discount: "GET 30% OFF",
    },
    {
      title: "Plaid Wool Winter Coat",
      img: img7,
      price: "$35",
      discount: "GET 15% OFF",
    },
    {
      title: "Water-Resistant Windbreaker Jacket",
      img: img8,
      price: "$75",
      discount: "GET 25% OFF",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto px-8 lg:px-4 py-2">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  m-auto mt-4">
      {cardData.map((items,idx) => (
        <div key={idx} className="relative lg:w-[90%]">
            <img className="w-full h-auto object-cover hover:scale-95 transition duration-300 rounded-xl" src={items.img} alt="img" />
          <span className="absolute top-5 left-4 text-xs p-1 font-semibold px-2 bg-white rounded-full">
            {items.discount}
          </span>
          <div className="flex justify-between font-bold mt-3 text-[16px]">
            <h1 className="cursor-pointer hover:text-red-400 duration-300 w-[75%]">{items.title}</h1>
            <span>{items.price}</span>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Card;
