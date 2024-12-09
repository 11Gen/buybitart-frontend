import React from "react";

const CardShow = () => {
  return (
    <div className="w-auto xl:min-w-[634px] h-auto xl:h-[32.5rem] xl:flex-row flex-col flex xl:items-end xl:gap-6 gap-3">
      <div className="w-[316px] sm:w-[376px] h-full rounded-xl border-[1px] border-[#bea2ff] p-3.5 relative overflow-hidden bg-[#00000027] flex flex-col justify-between lg:gap-0 gap-3 z-[0]">
        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-[#1c1c1ce2] to-[#bea2ff] from-[33%] opacity-30 pointer-events-none"></div>

        <img
          src={`/product1.png`}
          alt=""
          className="z-[1] relative h-[23.313rem] w-auto object-cover object-center rounded-[10px]"
        />

        <div className="flex flex-col w-full h-auto z-[1] font-main font-[400] text-sm">
          <div className="w-full h-auto flex justify-between items-center">
            <span className="text-[#BCBCBC]">Delivery:</span>{" "}
            {<span className="text-white">International-Free</span>}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#BCBCBC]">Dimension (cm):</span>{" "}
            {<span className="text-white">30x40</span>}
          </div>
        </div>

      <div className="w-full h-auto flex justify-between items-center z-[1] relative mt-2">
        <div className="flex w-max h-[32px] rounded-[20px] p-1 pr-2.5 gap-[8px] items-center z-[1] relative bg-[#2c2c2e]">
          <img src="/btcIcon.png" alt="" className="w-[24px] h-[24px]" />
          <span className="font-main font-[400]">0.1000BTC</span>
        </div>
        <button className="bg-white py-1 px-2 w-[140px] flex xl:hidden items-center rounded-[20px] gap-2 text-black font-main uppercase font-[600] text-sm hover:bg-[#FCCB00] hover:text-[#522700] transition-[color,transform,background-color] duration-[250ms] hover:scale-105">
          <img
            src="/bag.svg"
            alt=""
            className="w-[24px] h-[24px] object-contain invert"
          />
          <span>Add to cart</span>
        </button>
      </div>
      </div>
      <div className="flex flex-col w-auto gap-6">
        <h2 className="max-w-[376px] xl:max-w-[17.125rem] h-auto font-main text-2xl uppercase font-[600]">
          Painting-Embroidery «Unknown Bitcoin»
        </h2>
        <button className="bg-white py-1 px-2 w-[140px] hidden xl:flex items-center rounded-[20px] gap-2 text-black font-main uppercase font-[600] text-sm hover:bg-[#FCCB00] hover:text-[#522700] transition-[color,transform,background-color] duration-[250ms] hover:scale-105">
          <img
            src="/bag.svg"
            alt=""
            className="w-[24px] h-[24px] object-contain invert"
          />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default CardShow;
