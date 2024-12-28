import React, { useState } from "react";
import { galleryProducts, products, productsAuction } from "../../utils/data";
import PriceLabel from "../../components/PriceLabel";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import Footer from "../../components/Footer";
import useResponsive from "../../hooks/useResponsive";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { IoBagCheck } from "react-icons/io5";
import { Link } from "react-router-dom";

const OptiImage = ({ data }) => {
  const { isSmallMobile } = useResponsive();
  return (
    <>
      {!isSmallMobile ? (
        <img
          src={data.images[0]}
          alt="product image"
          className="h-full w-auto sm:max-w-[120px] max-w-[80px] rounded-2xl object-cover"
          draggable="false"
        />
      ) : (
        <>
          <div className="absolute w-full h-full inset-0 z-[-1] pointer-events-none">
            <div className="absolute w-full h-full inset-0 bg-gradient-to-tl from-[#00000000] to-black backdrop-blur-sm z-[1]"></div>
            <img
              src={data.images[0]}
              alt="product image"
              className="h-full w-full object-cover opacity-30 z-[0]"
              draggable="false"
            />
          </div>
        </>
      )}
    </>
  );
};

const ProductItem = ({ data, index }) => {
  const createdAt = moment().format("D.MM.YYYY");

  return (
    <div className="w-full sm:h-[130px] min-h-[100px] relative rounded-3xl border-[#ffffff1A] border-[1px] py-3 px-4 flex justify-between gap-5 overflow-hidden">
      <div className="flex gap-3 w-full h-full">
        <OptiImage data={data} />
        <div className="flex flex-col w-auto h-full justify-between gap-3">
          <h4 className="font-main font-[500] text-base leading-[19.2px] text-white sm:tracking-wide">
            {data.title}
          </h4>

          <div className="w-auto flex items-center gap-2">
            <PriceLabel price={data.price} difColor={"#FFFFFF26"} admRes />
            <div
              className={`flex w-max h-[32px] rounded-[20px] p-1 sm:pr-2.5 gap-1 items-center z-[1] relative`}
            >
              <img
                src={"/status.svg"}
                alt="icon Status"
                className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
              />
              <span className="font-main font-[400] sm:block hidden">
                Placed
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-max justify-between">
        <div className="flex w-max h-auto items-center gap-0.5 ml-auto">
          <button className="w-[30px] h-[30px] flex justify-center group items-center relative hover:bg-[#212121] transition-colors duration-[250ms] rounded-xl">
            <MdEdit className="w-[23px] h-[23px] text-[#a0a0a0] group-hover:text-white transition-colors duration-[250ms]" />
          </button>
          <button className="w-[30px] h-[30px] flex justify-center group items-center relative hover:bg-[#212121] transition-colors duration-[250ms] rounded-xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_287_2668"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_287_2668)">
                <path
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z"
                  className="fill-[#A3A3A3] transition-colors duration-[250ms] group-hover:fill-red-500"
                />
              </g>
            </svg>
          </button>
        </div>
        <span className="text-xs flex items-center justify-end tracking-wider font-main py-1 mb-1 text-white/80">
          {createdAt}
        </span>
      </div>
    </div>
  );
};

const GalleryItem = ({ data, index }) => {
  const createdAt = moment().format("D.MM.YYYY");

  return (
    <div className="w-full sm:h-[130px] min-h-[100px] relative rounded-3xl border-[#ffffff1A] border-[1px] py-3 px-4 flex justify-between gap-5 overflow-hidden">
      <div className="flex gap-3 w-full h-full">
        <OptiImage data={data} />
        <div className="flex flex-col w-auto h-full justify-between gap-3">
          <h4 className="font-main font-[500] text-base text-white sm:tracking-wide line-clamp-2">
            {data.title}
          </h4>

          <div className="flex items-center gap-2">
            <div
              className={`flex w-max h-[32px] rounded-[20px] p-1 sm:pr-2.5 gap-1 items-center z-[1] relative`}
            >
              <img
                src={"/status.svg"}
                alt="icon Status"
                className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
              />
              <span className="font-main font-[400] sm:block hidden">
                Placed
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-auto justify-between">
        <div className="flex w-auto h-auto items-center gap-0.5 ml-auto">
          <button className="w-[30px] h-[30px] flex justify-center group items-center relative hover:bg-[#212121] transition-colors duration-[250ms] rounded-xl">
            <MdEdit className="w-[23px] h-[23px] text-[#a0a0a0] group-hover:text-white transition-colors duration-[250ms]" />
          </button>
          <button className="w-[30px] h-[30px] flex justify-center group items-center relative hover:bg-[#212121] transition-colors duration-[250ms] rounded-xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_287_2668"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_287_2668)">
                <path
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z"
                  className="fill-[#A3A3A3] transition-colors duration-[250ms] group-hover:fill-red-500"
                />
              </g>
            </svg>
          </button>
        </div>
        <span className="text-xs flex items-center justify-end tracking-wider font-main py-1 mb-1 text-white/80">
          {createdAt}
        </span>
      </div>
    </div>
  );
};

const AuctionItem = ({ data, index }) => {
  return (
    <div className="w-full sm:h-[130px] min-h-[100px] relative rounded-3xl border-[#ffffff1A] border-[1px] py-3 px-4 flex justify-between gap-5 overflow-hidden">
      <div className="flex gap-3 w-full h-full">
        <OptiImage data={data} />
        <div className="flex flex-col w-auto h-full justify-between gap-3">
          <h4 className="font-main font-[500] text-base leading-[19.2px] text-white sm:tracking-wide">
            {data.title}
          </h4>

          <div className="flex items-center gap-2">
            <PriceLabel price={data.price} difColor={"#FFFFFF26"} admRes />
            <div
              className={`flex w-max h-[32px] rounded-[20px] p-1 sm:pr-2.5 gap-1 items-center z-[1] relative`}
            >
              <img
                src={"/status.svg"}
                alt="icon Status"
                className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
              />
              <span className="font-main font-[400] sm:block hidden">
                Placed
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-auto justify-between">
        <div className="flex w-auto h-auto items-center gap-0.5 ml-auto">
          <button className="w-[30px] h-[30px] flex justify-center group items-center relative hover:bg-[#212121] transition-colors duration-[250ms] rounded-xl">
            <MdEdit className="w-[23px] h-[23px] text-[#a0a0a0] group-hover:text-white transition-colors duration-[250ms]" />
          </button>
          <button className="w-[30px] h-[30px] flex justify-center group items-center relative hover:bg-[#212121] transition-colors duration-[250ms] rounded-xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_287_2668"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_287_2668)">
                <path
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z"
                  className="fill-[#A3A3A3] transition-colors duration-[250ms] group-hover:fill-red-500"
                />
              </g>
            </svg>
          </button>
        </div>
        <span className="text-xs flex items-center justify-end tracking-wider font-main py-1 mb-1 text-white/80">
          {data.timeToEnd}
        </span>
      </div>
    </div>
  );
};

const SoldItem = ({ data, index }) => {
  const soldAt = moment().format("D.MM.YYYY");

  return (
    <div className="w-full sm:h-[130px] min-h-[100px] relative rounded-3xl border-[#ffffff1A] border-[1px] py-3 px-4 flex justify-between gap-5 overflow-hidden">
      <div className="flex gap-3 w-full h-full">
        <OptiImage data={data} />
        <div className="flex flex-col w-auto h-full justify-between gap-3">
          <h4 className="font-main font-[500] text-base leading-[19.2px] text-white sm:tracking-wide">
            {data.title}
          </h4>

          <PriceLabel price={data.price} difColor={"#FFFFFF26"} admRes />
        </div>
      </div>
      <div className="flex flex-col h-full w-auto justify-between">
        <div className="flex w-auto h-auto items-center gap-0.5 ml-auto">
          {" "}
          <button className="w-[30px] h-[30px] flex justify-center group items-center relative rounded-xl">
            <IoBagCheck className="w-[23px] h-[23px] text-[#FCCB00]" />
          </button>
        </div>
        <span className="text-xs flex items-center justify-end tracking-wider font-main py-1 mb-1 text-white/80">
          {soldAt}
        </span>
      </div>
    </div>
  );
};

const AdminItems = () => {
  const [currentCategory, setCurrentCategory] = useState("Shop");
  const sold = [];
  return (
    <div className="w-[100vw] h-full">
      <div className="w-full h-full relative mt-[calc(52px+40px)] xl:mt-[calc(65px+40px)] px-[16px] xl:px-[6.25rem] pb-14">
        <div className="flex flex-col gap-3 w-full h-auto relative">
          <div className="w-full h-auto flex justify-between items-center">
            <h2 className="font-main font-[600] text-4xl leading-[100%] tracking-wide">
              Items
            </h2>
            <Link
              to={`${import.meta.env.VITE_ADMIN_ROUTE}/items/plus${
                currentCategory === "Auction" ? "/?auction" : currentCategory === "Gallery" ? "/?gallery" : ""
              }`}
              className="flex items-center gap-2 font-main text-lg text-[#FCCB00] font-[600] tracking-wider relative"
            >
              Add new{" "}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask
                  id="mask0_287_2685"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#FCCB00" />
                </mask>
                <g mask="url(#mask0_287_2685)">
                  <path
                    d="M12 21C11.7167 21 11.4792 20.9042 11.2875 20.7125C11.0958 20.5208 11 20.2833 11 20V13H4C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H11V4C11 3.71667 11.0958 3.47917 11.2875 3.2875C11.4792 3.09583 11.7167 3 12 3C12.2833 3 12.5208 3.09583 12.7125 3.2875C12.9042 3.47917 13 3.71667 13 4V11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H13V20C13 20.2833 12.9042 20.5208 12.7125 20.7125C12.5208 20.9042 12.2833 21 12 21Z"
                    fill="#FCCB00"
                  />
                </g>
              </svg>
            </Link>
          </div>

          <div className="w-full h-auto sticky sm:top-[70px] top-[52px] bg-black z-[5] flex gap-2 sm:gap-3 py-3 border-b-[1px] border-b-[#FFFFFF1A]">
            {["Shop", "Gallery", "Auction", "Sold"].map((category, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategory(category)}
                className={`w-auto px-4 h-[35px] flex justify-center items-center rounded-full ${
                  currentCategory == category
                    ? "bg-[#FCCB00] text-[#241D00] hover:bg-[#D4A900] hover:text-[#1C1600]"
                    : "bg-[#FFFFFF1A] text-[rgba(255,255,255,0.85)] hover:text-[rgba(255,255,255,1)] hover:bg-[#ffffff25]"
                } transition duration-[250ms] font-main font-[400] text-base mx-0 capitalize`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="min-h-[580px] w-full h-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                layout
                transition={{ duration: 0.3 }}
                className="w-full h-full relative grid 3xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 sm:gap-5 gap-3"
              >
                {currentCategory === "Shop" ? (
                  <>
                    {products.length ? (
                      products.map((item, index) => (
                        <ProductItem data={item} key={index} index={index} />
                      ))
                    ) : (
                      <div className="w-full relative h-full font-main opacity-90">
                        No items there yet :\
                      </div>
                    )}
                  </>
                ) : currentCategory === "Gallery" ? (
                  <>
                    {galleryProducts.length ? (
                      galleryProducts.map((item, index) => (
                        <GalleryItem data={item} key={index} index={index} />
                      ))
                    ) : (
                      <div className="w-full relative h-full font-main opacity-90">
                        No items there yet :\
                      </div>
                    )}
                  </>
                ) : currentCategory === "Auction" ? (
                  <>
                    {productsAuction.length ? (
                      productsAuction.map((item, index) => (
                        <AuctionItem data={item} key={index} index={index} />
                      ))
                    ) : (
                      <div className="w-full relative h-full font-main opacity-90">
                        No items there yet :\
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {sold.length ? (
                      sold.map((item, index) => (
                        <SoldItem key={index} data={item} index={index} />
                      ))
                    ) : (
                      <div className="w-full relative h-full font-main opacity-90">
                        No items there yet :\
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminItems;
