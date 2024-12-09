import React from "react";
import { Link } from "react-router-dom";

const CardShow = ({ data }) => {
  return (
    <div className="w-auto xl:min-w-[634px] h-auto xl:h-[32.5rem] xl:flex-row flex-col flex xl:items-end xl:gap-6 gap-3">
      <div className="w-[316px] sm:w-[376px] h-full rounded-xl border-[1px] border-[#FFFFFF1A] p-3.5 relative overflow-hidden bg-[#00000027] backdrop-blur-3xl flex flex-col justify-between lg:gap-0 gap-3 z-[0]">
        <Link to={`/shop/${data.hash}`} className="flex flex-col relative gap-3">
          <img
            src={data.image}
            draggable={false}
            alt={data.title}
            className="z-[1] relative h-[23.313rem] w-auto object-cover object-center rounded-[10px]"
          />

          <div className="flex flex-col w-full h-auto z-[1] font-main font-[400] text-sm">
            <div className="w-full h-auto flex justify-between items-center">
              <span className="text-[#BCBCBC]">Delivery:</span>{" "}
              {<span className="text-white">{data.delivery}</span>}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#BCBCBC]">Dimension (cm):</span>{" "}
              {<span className="text-white">{data.dimensions}</span>}
            </div>
          </div>
        </Link>
        <div className="w-full h-auto flex justify-between items-center z-[1] relative mt-2">
          <Link to={`/shop/${data.hash}`} className="flex w-max h-[32px] rounded-[20px] p-1 pr-2.5 gap-[8px] items-center z-[1] relative bg-[#2c2c2e]">
            <img src="/btcIcon.png" alt="" className="w-[24px] h-[24px]" />
            <span className="font-main font-[400]">{data.price}</span>
          </Link>
          <button className="bg-white py-[3px] px-2 w-[140px] flex xl:hidden items-center rounded-[20px] gap-2 text-black font-main uppercase font-[600] text-sm hover:bg-[#ffffff00] hover:text-[#ffffff] transition-[color,transform,background-color] duration-[250ms] group border-[1px] border-[#2c2c2e]">
            <img
              src="/bag.svg"
              alt=""
              className="w-[24px] h-[24px] object-contain invert group-hover:invert-0 transition duration-[250ms]"
            />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-auto gap-6 xl:px-0 px-1.5">
        <Link to={`/shop/${data.hash}`} className="max-w-[376px] xl:max-w-[17.125rem] h-auto font-main text-xl xl:text-2xl uppercase font-[600]">
          {data.title}
        </Link>
        <button className="bg-white py-[3px] px-2 w-[140px] hidden xl:flex items-center rounded-[20px] gap-2 text-black font-main uppercase font-[600] text-sm hover:bg-[#ffffff00] hover:text-[#ffffff] transition-[color,transform,background-color] duration-[250ms] group border-[1px] border-[#2c2c2e]">
          <img
            src="/bag.svg"
            alt=""
            className="w-[24px] h-[24px] object-contain invert group-hover:invert-0 transition duration-[250ms]"
          />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default CardShow;
