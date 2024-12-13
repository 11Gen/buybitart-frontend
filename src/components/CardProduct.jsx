import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";

const CardProduct = ({ data, setCart, cart }) => {
  const {isSmallMobile, isMobile} = useResponsive();
  const [isAdded, setIsAdded] = useState(Boolean(cart.find((item) => item.hash === data.hash)))

  function addToCart() {
    setIsAdded(true)
    const exsistedOne = cart.find((item) => item.hash === data.hash)
    if(exsistedOne) return setCart(cart.map((item) => item.hash === data.hash ? {...item, quantity: item.quantity + 1} : item))
    else return setCart((prev) => [...prev, {...data, quantity: 1}])
  }

  useEffect(() => {
    setIsAdded(Boolean(cart.find((item) => item.hash === data.hash)))
  }, [cart])


  return (
    <>
      <div className="w-full h-full rounded-xl p-3.5 relative overflow-hidden border-[1px] border-[#FFFFFF1A] flex flex-col justify-between gap-3 bg-[#00000027] backdrop-blur-3xl transiton-[transform] duration-300">
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
          <button onClick={addToCart} className={`py-[3px] px-2 ${isAdded ? isSmallMobile ? 'w-[60px]' : 'w-[96px]' : isMobile ? isSmallMobile ? 'w-[60px]' : 'w-[145px]' : 'w-[145px]'} ${isAdded ? 'bg-[#FCCB00] text-[#241D00] hover:bg-[#D4A900] hover:text-[#1C1600] pointer-events-none' : 'bg-white text-black hover:bg-[#fff0] hover:text-[#ffffff]'} flex items-center rounded-[20px] font-main uppercase font-[600] gap-2 text-sm transition-[color,transform,background-color,width] duration-[250ms] group border-[1px] border-[#2c2c2e]`}>
            <img
              src="/bag.svg"
              alt=""
              className={`w-[24px] h-[24px] object-contain invert ${isAdded ? '' : 'group-hover:invert-0'} transition duration-[250ms]`}
            />
            {isAdded ? isSmallMobile ? <span className="leading-[100%] relative left-[-2px]">✔</span> : <span className="tracking-wide">Added</span> : isSmallMobile ? <span className="text-2xl leading-[100%] relative top-[-1px] left-[-2.5px]">+</span> : <span className="tracking-wide">Add to cart</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default CardProduct;