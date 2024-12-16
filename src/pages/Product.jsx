import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../utils/data";
import Slider from "../components/Slider";
import Breadcamp from "../components/Breadcrumb";
import convert from "convert-length";
import PriceLabel from "../components/PriceLabel";
import AddToCartButton from "../components/AddToCartButton";
import { toast } from "react-toastify";
import classNames from "classnames";
import useResponsive from "../hooks/useResponsive";

function createMarkup(data) {
  return { __html: data };
}

const Product = ({ cart, setCart }) => {
  const { hash } = useParams();
  const sliderRef = useRef(null);
  const currentData = useMemo(() => products.find((item) => item.hash === hash), [hash]);
  const {isBigLaptop} = useResponsive();
  const [data, setData] = useState(currentData);
  const shortName = data.hash.split("-");
  const capitalizeShortName = shortName.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  const [isAdded, setIsAdded] = useState(Boolean(cart.find((item) => item.hash === data.hash)));
  const inchesSize = data.dimensions.split("x").map((n) => Number(convert(Number(n), "cm", "in").toFixed(1))).join("x");
  const [isSticky, setIsSticky] = useState(false);
  const sliderContainerRef = useRef(null);
  const textContainerRef = useRef(null);

  function addToCart() {
    setIsAdded(true);
    const exsistedOne = cart.find((item) => item.hash === data.hash);
    toast.success(`"${capitalizeShortName}" Added to cart`);
    if (exsistedOne)
      return setCart(
        cart.map((item) =>
          item.hash === data.hash
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    else return setCart((prev) => [...prev, { ...data, quantity: 1 }]);
  }

  useEffect(() => {
    if(sliderContainerRef.current && textContainerRef.current && !isBigLaptop) {
      setIsSticky(sliderContainerRef.current.offsetHeight > (textContainerRef.current.offsetHeight * 1.3))
    }
  }, [sliderContainerRef, textContainerRef, isBigLaptop])

  useEffect(() => {
    setIsAdded(Boolean(cart.find((item) => item.hash === data.hash)));
  }, [cart]);

  useEffect(() => {
    if (currentData) setData(currentData);
  }, [currentData]);

  return (
    <>
      <div className="w-[100vw] h-full">
        <div className="w-full h-full relative mt-[calc(52px+25px)] xl:mt-[calc(65px+25px)] px-[16px] xl:px-[6.25rem]">
          <div className="w-full h-full relative mt-[25px]">
            <Breadcamp />

            <div className="flex w-full h-auto relative mt-[34px] justify-between gap-[120px]">
              <Slider data={data} sliderRef={sliderRef} sliderContainerRef={sliderContainerRef} />

              <div className={classNames("w-full h-max flex flex-col gap-8", {'xl:sticky xl:top-[80px]': isSticky})} ref={textContainerRef}>
                <h2 className="uppercase font-main font-[600] text-6xl text-white">
                  {data.title}
                </h2>
                <div className="w-full h-auto flex flex-col gap-6 relative">
                  <div
                    className="w-full h-auto flex flex-col gap-4 relative font-main font-[400] tracking-wide text-lg text-[#CFCFCF] max-w-[90%] text-pretty pt-0.5 pb-4"
                    dangerouslySetInnerHTML={createMarkup(data.description)}
                  />
                  <div className="py-0.5 w-full flex gap-5 h-auto relative">
                    <div className="flex flex-col w-full max-w-[163px] font-[400] text-base leading-[145%]">
                      <span className="text-[#757181]">Dimension (cm):</span>
                      <span className="text-white">{data.dimensions}</span>
                    </div>
                    <div className="flex flex-col w-full max-w-[163px] font-[400] text-base leading-[145%]">
                      <span className="text-[#757181]">
                        Dimension (inches):
                      </span>
                      <span className="text-white">{inchesSize}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto relative flex gap-4">
                  <PriceLabel price={data.price} difColor={"#FFFFFF26"} />
                  <AddToCartButton addToCart={addToCart} isAdded={isAdded} />
                </div>
              </div>
            </div>

            <div className="w-full h-auto relative my-[90px] flex flex-col gap-10">
              <h2 className="font-main text-5xl font-[600] leading-[43.2px] text-white uppercase tracking-wide">
                Related products
              </h2>
              <div className="w-full h-[415px] border-[1px] border-white/15 flex items-center justify-between gap-5"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
