import React from "react";
import { Link } from "react-router-dom";

const CardProduct = ({ data }) => {
  return (
    <>
      <div className="w-full h-full rounded-xl p-3.5 relative overflow-hidden border-[1px] border-[#FFFFFF1A] flex flex-col justify-between gap-3 bg-[#00000027] backdrop-blur-3xl active:scale-95 transiton-[transform] duration-300">
        <Link to={`/shop/${data.hash}`} className="flex flex-col relative gap-3">
          <img
            src={data.image}
            alt={data.title}
            draggable={false}
            className="z-[1] relative h-[23.313rem] w-auto object-cover object-center rounded-[10px]"
          />

          <h2 className="z-[1] font-main font-[600] text-lg uppercase">
            {data.title}
          </h2>
        </Link>

        <div className="w-full h-auto flex justify-between items-center z-[1] relative mt-2">
          <Link to={`/shop/${data.hash}`} className="flex w-max h-[32px] rounded-[20px] p-1 pr-2.5 gap-[8px] items-center z-[1] relative bg-[#2c2c2e]">
            <img src={"/btcIcon.png"} alt="" className="w-[24px] h-[24px]" />
            <span className="font-main font-[400]">{data.price}</span>
          </Link>
          <button className="bg-white py-[3px] px-2 w-[141px] flex items-center rounded-[20px] gap-2 text-black font-main uppercase font-[600] text-sm hover:bg-[#fff0] hover:text-[#ffffff] transition-[color,transform,background-color] duration-[250ms] group border-[1px] border-[#2c2c2e]">
            <img
              src="/bag.svg"
              alt=""
              className="w-[24px] h-[24px] object-contain invert group-hover:invert-0 transition duration-[250ms]"
            />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
