import React from "react";

const items = ["SHORTS", "T-SHIRT", "BLAZER", "JACKET", "JEANS"];

const Marquee = () => {
  return (
    <div className=" bg-[#fdf8f4] py-8 overflow-hidden">
      <div className="border-t border-b border-black -rotate-2 overflow-hidden p-2">
        <div className="flex">
          <div className="marquee text-black text-4xl font-semibold tracking-wide flex gap-6 py-3">
            {Array(10)
              .fill(items)
              .flat()
              .map((item, index) => (
                <React.Fragment key={index}>
                  <span className="whitespace-nowrap">{item}</span>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
      <style>{`
        .marquee {
          display: flex;
          gap: 8rem;
          min-width: 100%;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); } 
        }
      `}</style>
    </div>
  );
};

export default Marquee;
