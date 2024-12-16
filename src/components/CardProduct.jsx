import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";
import { toast } from "react-toastify";
import PriceLabel from './PriceLabel';
import AddToCartButton from "./AddToCartButton";

const CardProduct = ({ data, setCart, cart }) => {
  const {isSmallMobile, isMobile} = useResponsive();
  const [isAdded, setIsAdded] = useState(Boolean(cart.find((item) => item.hash === data.hash)))
  const shortName = data.hash.split('-')
  const capitalizeShortName = shortName.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')

  function addToCart() {
    setIsAdded(true)
    const exsistedOne = cart.find((item) => item.hash === data.hash)
    toast.success(`"${capitalizeShortName}" Added to cart`);
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
          <PriceLabel IsCardHash={data.hash} price={data.price} />
          <AddToCartButton addToCart={addToCart} isAdded={isAdded} />
        </div>
      </div>
    </>
  );
};

export default CardProduct;