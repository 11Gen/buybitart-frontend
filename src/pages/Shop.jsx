import React, { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import CardProduct from "../components/CardProduct";
import { pages, products, productsAuction } from "../utils/data";
import useResponsive from "../hooks/useResponsive";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { getPrice } from "../utils/index";
import Input from "../components/Input";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Paginator from "../components/Paginator";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const Shop = ({ setCart, cart }) => {
  const [shopSettings, setShopSettings] = useState({
    isAuction: true,
    isFiltersOpen: false,
    isSticky: false,
  });
  const [btcPrice, setBtcPrice] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [priceFilters, setPriceFilters] = useState({
    min: 0,
    max: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const priceType = searchParams.get("priceType") || "BTC";

  const onInputChange = (event) => {
    const { name, value } = event.target;
    const numericValue = Math.max(0, Number(value));
    setPriceFilters((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const { isMobile, isBigLaptop } = useResponsive();
  const lenis = useLenis();
  const inputCSS =
    "bg-[#212121] w-full py-[5px] px-3 rounded-xl text-sm outline-none leading-[23px] border-[1px] border-[#ffffff05] tracking-wide transition-colors duration-[250ms] font-main placeholder-[#707070] focus:placeholder-[#ffffff00]";

  useEffect(() => {
    async function fetchBTCPrice() {
      try {
        const response = await axios.get(import.meta.env.VITE_USDBTC_API);
        setBtcPrice(response.data.USD.sell);
      } catch (error) {
        console.error("Failed to fetch BTC price:", error);
      }
    }

    fetchBTCPrice();
  }, []);

  const filterByPrice = (product) => {
    const price =
      getPrice(priceType === "BTC" ? product.price : product.usdPrice) || 0;
    return (!min || price >= min) && (!max || price <= max);
  };

  const combinedProducts = useMemo(() => {
    const updatedProducts = products.map((item) => ({
      ...item,
      usdPrice: (btcPrice * getPrice(item.price)).toFixed(2) + "USD",
    }));

    const updatedAuctionProducts = productsAuction.map((item) => ({
      ...item,
      usdPrice: (btcPrice * (getPrice(item.currentPrice) != 0 ? getPrice(item.currentPrice) : getPrice(item.startPrice))).toFixed(2) + "USD",
    }));

    const productsToFilter = shopSettings.isAuction
      ? [...updatedAuctionProducts, ...updatedProducts]
      : updatedProducts;

    return priceFilters.min || priceFilters.max
      ? productsToFilter.filter(filterByPrice)
      : productsToFilter;
  }, [
    shopSettings.isAuction,
    productsAuction,
    products,
    priceFilters,
    btcPrice,
  ]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerPage(
        width >= 1536 ? 12 : width >= 1280 ? 9 : width >= 640 ? 10 : 8
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleFilters() {
    setShopSettings((prev) => ({
      ...prev,
      isFiltersOpen: !shopSettings.isFiltersOpen,
    }));
  }

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (!isMobile) {
      if (shopSettings.isFiltersOpen) {
        document.documentElement.style.overflow = "hidden";
        document.querySelector(".navBar").style.paddingRight = isBigLaptop
          ? ""
          : "calc(6.25rem + 14px)";
        lenis?.stop();
        ScrollTrigger.normalizeScroll(false);
      } else {
        lenis?.start();
        document.documentElement.style.overflow = "";
        document.querySelector(".navBar").style.paddingRight = "";
        ScrollTrigger.normalizeScroll(true);
      }

      return () => {
        lenis?.start();
        ScrollTrigger.normalizeScroll(true);
      };
    } else {
      if (shopSettings.isFiltersOpen)
        document.documentElement.style.overflow = "hidden";
      else document.documentElement.style.overflow = "";
    }
  }, [shopSettings.isFiltersOpen, lenis, isMobile]);

  useEffect(() => {
    function checkSticky() {
      setShopSettings((prev) => ({
        ...prev,
        isSticky: window.scrollY > 20,
      }));
    }
    window.addEventListener("scroll", checkSticky);

    return () => window.removeEventListener("scroll", checkSticky);
  }, []);

  return (
    <div className="w-[100vw] h-full contShop">
      <div className="w-full h-full sticky top-[30px] xl:top-[52px] mt-[72px] px-[16px] pb-4 flex flex-col justify-end xl:px-[6.25rem] overflow-x-hidden z-[2]">
        <div className="w-full h-auto relative flex justify-between items-end webkitBgBlurIos16 bg-gradient-to-t from-[#000000]/75 to-[#000] to-[85%] py-5 border-b-[1px] border-[#FFFFFF1A]">
          <h2 className="font-main font-[600] text-4xl leading-[100%] uppercase">
            {pages.shop.sections[0].title}
          </h2>

          <div className="flex w-auto h-full items-center gap-6">
            <button
              aria-pressed={shopSettings.isAuction}
              onClick={() =>
                setShopSettings((prev) => ({
                  ...prev,
                  isAuction: !shopSettings.isAuction,
                }))
              }
              className={`${
                shopSettings.isAuction
                  ? "bg-[#FCCB00] text-[#241D00] hover:bg-[#D4A900] hover:text-[#1C1600]"
                  : "bg-[#212121] text-[#fff] hover:bg-[#FFFFFF1A] hover:text-[rgba(255,255,255,0.85)]"
              } ${
                isMobile ? "w-[43px]" : "w-[157px]"
              } flex items-center justify-center gap-[10px] rounded-xl h-[43px] font-main font-[500] text-base transition duration-[250ms]`}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  shopSettings.isAuction ? "" : "invert brightness-0"
                } transition duration-[250ms]`}
              >
                <path
                  d="M12.0001 14.506L5.84411 21.733C5.64833 21.9609 5.40759 22.1459 5.13699 22.2764C4.86639 22.4069 4.57176 22.4801 4.27154 22.4915C3.97132 22.5028 3.672 22.4521 3.39231 22.3424C3.11263 22.2327 2.85861 22.0664 2.64617 21.8539C2.43374 21.6415 2.26746 21.3875 2.15775 21.1078C2.04805 20.8281 1.99729 20.5288 2.00864 20.2286C2.01999 19.9284 2.09322 19.6337 2.22373 19.3631C2.35425 19.0925 2.53924 18.8518 2.76711 18.656L9.99411 12.5M22.0001 12.405L15.9051 18.5M12.0951 2.5L6.00011 8.595M11.3331 3.262L6.76211 7.833C6.76211 7.833 9.04811 10.881 11.3331 13.167C13.6191 15.452 16.6671 17.738 16.6671 17.738L21.2381 13.167C21.2381 13.167 18.9521 10.119 16.6671 7.833C14.3811 5.548 11.3331 3.262 11.3331 3.262Z"
                  stroke="#241D00"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isMobile ? null : "Auction"}
            </button>
            <button
              aria-pressed={toggleFilters}
              onClick={toggleFilters}
              className="w-auto flex items-center justify-center gap-1 rounded-xl h-[43px] font-main font-[400] text-base text-white hover:text-[rgba(255,255,255,0.85)] transition duration-[250ms] group"
            >
              Filters
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                className="group-hover:opacity-85 transition duration-[250ms]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_287_2280"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="25"
                >
                  <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_287_2280)">
                  <path
                    d="M12 21.5C11.7167 21.5 11.4792 21.4042 11.2875 21.2125C11.0958 21.0208 11 20.7833 11 20.5V16.5C11 16.2167 11.0958 15.9792 11.2875 15.7875C11.4792 15.5958 11.7167 15.5 12 15.5C12.2833 15.5 12.5208 15.5958 12.7125 15.7875C12.9042 15.9792 13 16.2167 13 16.5V17.5H20C20.2833 17.5 20.5208 17.5958 20.7125 17.7875C20.9042 17.9792 21 18.2167 21 18.5C21 18.7833 20.9042 19.0208 20.7125 19.2125C20.5208 19.4042 20.2833 19.5 20 19.5H13V20.5C13 20.7833 12.9042 21.0208 12.7125 21.2125C12.5208 21.4042 12.2833 21.5 12 21.5ZM4 19.5C3.71667 19.5 3.47917 19.4042 3.2875 19.2125C3.09583 19.0208 3 18.7833 3 18.5C3 18.2167 3.09583 17.9792 3.2875 17.7875C3.47917 17.5958 3.71667 17.5 4 17.5H8C8.28333 17.5 8.52083 17.5958 8.7125 17.7875C8.90417 17.9792 9 18.2167 9 18.5C9 18.7833 8.90417 19.0208 8.7125 19.2125C8.52083 19.4042 8.28333 19.5 8 19.5H4ZM8 15.5C7.71667 15.5 7.47917 15.4042 7.2875 15.2125C7.09583 15.0208 7 14.7833 7 14.5V13.5H4C3.71667 13.5 3.47917 13.4042 3.2875 13.2125C3.09583 13.0208 3 12.7833 3 12.5C3 12.2167 3.09583 11.9792 3.2875 11.7875C3.47917 11.5958 3.71667 11.5 4 11.5H7V10.5C7 10.2167 7.09583 9.97917 7.2875 9.7875C7.47917 9.59583 7.71667 9.5 8 9.5C8.28333 9.5 8.52083 9.59583 8.7125 9.7875C8.90417 9.97917 9 10.2167 9 10.5V14.5C9 14.7833 8.90417 15.0208 8.7125 15.2125C8.52083 15.4042 8.28333 15.5 8 15.5ZM12 13.5C11.7167 13.5 11.4792 13.4042 11.2875 13.2125C11.0958 13.0208 11 12.7833 11 12.5C11 12.2167 11.0958 11.9792 11.2875 11.7875C11.4792 11.5958 11.7167 11.5 12 11.5H20C20.2833 11.5 20.5208 11.5958 20.7125 11.7875C20.9042 11.9792 21 12.2167 21 12.5C21 12.7833 20.9042 13.0208 20.7125 13.2125C20.5208 13.4042 20.2833 13.5 20 13.5H12ZM16 9.5C15.7167 9.5 15.4792 9.40417 15.2875 9.2125C15.0958 9.02083 15 8.78333 15 8.5V4.5C15 4.21667 15.0958 3.97917 15.2875 3.7875C15.4792 3.59583 15.7167 3.5 16 3.5C16.2833 3.5 16.5208 3.59583 16.7125 3.7875C16.9042 3.97917 17 4.21667 17 4.5V5.5H20C20.2833 5.5 20.5208 5.59583 20.7125 5.7875C20.9042 5.97917 21 6.21667 21 6.5C21 6.78333 20.9042 7.02083 20.7125 7.2125C20.5208 7.40417 20.2833 7.5 20 7.5H17V8.5C17 8.78333 16.9042 9.02083 16.7125 9.2125C16.5208 9.40417 16.2833 9.5 16 9.5ZM4 7.5C3.71667 7.5 3.47917 7.40417 3.2875 7.2125C3.09583 7.02083 3 6.78333 3 6.5C3 6.21667 3.09583 5.97917 3.2875 5.7875C3.47917 5.59583 3.71667 5.5 4 5.5H12C12.2833 5.5 12.5208 5.59583 12.7125 5.7875C12.9042 5.97917 13 6.21667 13 6.5C13 6.78333 12.9042 7.02083 12.7125 7.2125C12.5208 7.40417 12.2833 7.5 12 7.5H4Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {shopSettings.isFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, visibility: "hidden" }}
            animate={{ opacity: 1, y: 0, visibility: "visible" }}
            exit={{ opacity: 0, y: 25, visibility: "hidden" }}
            transition={{ duration: 0.25 }}
            style={{ willChange: "opacity, visibility, transform" }}
            className={`w-full xl:max-w-[300px] max-w-[calc(100%-32px)] h-auto pb-5 shadow-xl flex flex-col gap-4 bg-[#050505] fixed z-[5] xl:right-[6.25rem] right-[16px] ${
              shopSettings.isSticky
                ? "top-[113px] sm:top-[135px]"
                : "top-[170px]"
            } border-[1px] border-t-0 border-[#ffffff10] rounded-b-xl p-4`}
          >
            <div className="flex flex-col gap-2 w-full h-auto">
              <div className="flex gap-1.5 justify-between items-center w-full h-auto">
                <h4 className="font-main text-lg font-[400] tracking-wide">
                  Price
                </h4>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_853_6636"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                  >
                    <path d="M0 0H24V24H0V0Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_853_6636)">
                    <path
                      d="M11.3851 15.275C12.4961 15.271 14.9251 15.262 14.8971 13.717C14.8701 12.137 12.5371 12.232 11.4001 12.279C11.2721 12.285 11.1614 12.2887 11.0681 12.29L11.1201 15.277C11.1961 15.275 11.2844 15.2744 11.3851 15.275ZM11.2671 10.922C12.1941 10.921 14.2171 10.919 14.1931 9.51403C14.1671 8.07703 12.2241 8.16203 11.2751 8.20403C11.1684 8.20936 11.0757 8.2127 10.9971 8.21403L11.0441 10.923L11.2671 10.922Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.09616 23.641C15.5262 25.244 22.0382 21.331 23.6412 14.903C25.2442 8.47399 21.3302 1.96199 14.9002 0.359994C8.47416 -1.24401 1.96216 2.66999 0.360165 9.09999C-1.24284 15.528 2.67017 22.04 9.09717 23.642M13.3792 6.62199C15.1332 6.74599 16.5292 7.25999 16.7122 8.86399C16.8482 10.038 16.3682 10.753 15.5892 11.167C16.8892 11.455 17.7142 12.21 17.5842 13.938C17.4232 16.083 15.8362 16.686 13.5582 16.857L13.5962 19.107L12.2402 19.131L12.2012 16.911C11.8505 16.9177 11.4892 16.9203 11.1172 16.919L11.1572 19.149L9.80116 19.173L9.76116 16.919L9.37817 16.922C9.1835 16.922 8.98816 16.924 8.79216 16.928L7.02617 16.958L7.26717 15.334C7.26717 15.334 8.27116 15.332 8.25317 15.317C8.63717 15.309 8.73417 15.032 8.75517 14.858L8.69316 11.3L8.79016 11.298H8.83617C8.7884 11.2922 8.74027 11.2899 8.69217 11.291L8.64816 8.75099C8.59116 8.47699 8.40716 8.16099 7.85816 8.17099C7.87316 8.15099 6.87217 8.18799 6.87217 8.18799L6.84617 6.73999L8.71817 6.70799V6.71499C9.00016 6.70966 9.28783 6.70099 9.58117 6.68899L9.54317 4.45999L10.8992 4.43699L10.9372 6.62099C11.2992 6.60799 11.6632 6.59399 12.0202 6.58799L11.9822 4.41799L13.3392 4.39399L13.3792 6.62199Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <div className="flex gap-3 items-center w-full justify-between">
                <Input
                  className={inputCSS}
                  placeholder="min."
                  onChange={onInputChange}
                  name={"min"}
                  defaultValue={priceFilters.min ? priceFilters.min : ""}
                  type="text"
                />{" "}
                -
                <Input
                  className={inputCSS}
                  placeholder="max."
                  onChange={onInputChange}
                  name={"max"}
                  defaultValue={priceFilters.max ? priceFilters.max : ""}
                  type="text"
                />
              </div>
            </div>

            <div className="w-full h-auto flex flex-col gap-2">
              {["BTC", "USD"].map((category) => (
                <label
                  key={category}
                  className="relative flex items-center cursor-pointer justify-between select-none"
                >
                  <input
                    defaultChecked={category === priceType}
                    className="sr-only peer"
                    name="futuristic-radio"
                    type="radio"
                    onChange={() => setSearchParams({ priceType: category })}
                  />
                  <span className="text-white font-main text-base tracking-wide font-[300]">
                    {category}
                  </span>
                  <div className="w-4 h-4 relative left-[-4px] bg-transparent outline outline-1 outline-offset-2 outline-[#909090] rounded-full peer-checked:bg-white peer-checked:outline-[#909090] peer-hover:shadow-lg transition duration-300 ease-in-out" />
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Paginator
        data={combinedProducts}
        itemsPerPage={itemsPerPage}
        animationVariants={fadeVariants}
        className={`${
          combinedProducts.length
            ? "grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
            : "flex"
        } w-full px-[16px] xl:px-[6.25rem] relative mt-[12px] mb-[47px]`}
      >
        {(paginatedData) =>
          paginatedData.length ? (
            paginatedData.map((product, index) => (
              <CardProduct
                data={product}
                key={product.id || index}
                setCart={setCart}
                cart={cart}
                index={index}
                priceType={priceType}
                auction={shopSettings.isAuction && product?.endTime}
              />
            ))
          ) : priceFilters.min || priceFilters.max ? (
            <div className="min-h-[560px] w-full justify-center items-center flex flex-col gap-2">
              <img
                src="/empty-box.svg"
                alt=""
                className="w-full h-full max-h-[170px] sm:max-h-[225px] object-contain invert opacity-40"
              />
              <p className="font-main sm:text-xl text-lg font-[300] opacity-40">
                No products match your current filters.
              </p>
            </div>
          ) : (
            <div>Something went wrong</div>
          )
        }
      </Paginator>

      <Footer />
    </div>
  );
};

export default Shop;
