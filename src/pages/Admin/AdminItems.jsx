import React, { useEffect, useState } from "react";
import { galleryProducts, products, productsAuction } from "../../utils/data";
import PriceLabel from "../../components/PriceLabel";
import { MdEdit } from "react-icons/md";
import moment from "moment";
import Footer from "../../components/Footer";
import useResponsive from "../../hooks/useResponsive";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SlidingBullets from "../../components/SlidingBullets";
import Modal from "../../components/Modal";
import DeletePopup from "../../components/DeletePopup";

const optiData = [
  {
    id: "Shop",
    data: products,
  },
  {
    id: "Gallery",
    data: galleryProducts,
  },
  {
    id: "Auction",
    data: productsAuction,
  },
  {
    id: "Sold",
    data: [],
  },
];

const OptiImage = ({ image, isMobile }) => (
  <div className="relative h-full w-auto">
    {isMobile ? (
      <div className="absolute inset-0 z-[-1] w-full h-full pointer-events-none">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tl from-[#00000000] to-black backdrop-blur-sm z-[1]" />
        <img
          src={image}
          alt="product"
          className="h-full w-full object-cover opacity-30 z-[0]"
          draggable="false"
        />
      </div>
    ) : (
      <img
        src={image}
        alt="product"
        className="h-full w-auto max-w-[80px] sm:max-w-[120px] rounded-2xl object-cover"
        draggable="false"
      />
    )}
  </div>
);

const ActionButtons = ({setPopup, item}) => (
  <div className="flex w-max h-auto items-center gap-1 ml-auto">
    <Link to={`edit/${item.hash}${item.category === 'Auction' ? '?auction' : item.category === 'Gallery' ? '?gallery' : ''}`} className="w-[30px] h-[30px] flex justify-center group items-center relative hover:bg-[#212121] transition-colors duration-[250ms] rounded-xl">
      <MdEdit className="w-[23px] h-[23px] text-[#a0a0a0] group-hover:text-white transition-colors duration-[250ms]" />
    </Link>
    <button onClick={() => setPopup({state: true, item})} className="w-[30px] h-[30px] flex justify-center group items-center relative hover:bg-[#212121] transition-colors duration-[250ms] rounded-xl">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17ZM14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17Z"
          className="fill-[#A3A3A3] transition-colors duration-[250ms] group-hover:fill-red-500"
        />
      </svg>
    </button>
  </div>
);

const ProductItem = ({ data, isMobile, currentCategory, setPopup }) => (
  <div className="w-full sm:h-[130px] min-h-[100px] relative rounded-3xl border-[#ffffff10] bg-[#ffffff10] border-[1px] py-3 px-4 flex justify-between gap-5 overflow-hidden">
    <div className="flex gap-3 w-full h-full">
      <OptiImage image={data.images[0]} isMobile={isMobile} />
      <div className="flex flex-col justify-between w-auto gap-3">
        <h4 className="font-main font-[500] text-base leading-[19.2px] text-white sm:tracking-wide">
          {data.title}
        </h4>
        <div className="flex items-center gap-2">
          {(currentCategory === "Shop" || currentCategory === "Auction") &&
            data.price && (
              <PriceLabel price={data.price} difColor="#FFFFFF26" admRes />
            )}
          <div
            className={`flex w-max h-[32px] rounded-[20px] p-1 sm:pr-2.5 gap-1 items-center z-[1] relative`}
          >
            <img
              src="/status.svg"
              alt="status"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <span className="font-main font-[400] hidden sm:block">Placed</span>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-end justify-between">
      {currentCategory !== "Sold" && <ActionButtons setPopup={setPopup} item={{...data, category: currentCategory}} />}
      <span className="text-xs flex items-center justify-end tracking-wider font-main py-1 mb-1 text-white/80">
        {moment().format("D.MM.YYYY")}
      </span>
    </div>
  </div>
);

const CategoryTabs = ({ currentCategory, setCurrentCategory }) => (
  <div className="w-full h-auto sticky sm:top-[70px] top-[52px] bg-black z-[5] flex gap-2 sm:gap-3 py-3 border-b-[1px] border-b-[#FFFFFF1A]">
    <SlidingBullets
      data={optiData.map((property) => property.id)}
      state={currentCategory}
      setState={setCurrentCategory}
      className="w-full h-auto flex items-center !mx-0"
    />
  </div>
);

const ProductList = ({ currentCategory, setPopup }) => {
  const { isMobile } = useResponsive();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const category = optiData.find((c) => c.id === currentCategory);
    setCategoryData(category?.data || []);
  }, [currentCategory]);

  return (
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
        {categoryData.length ? (
          categoryData.map((product, index) => (
            <ProductItem
              key={`${currentCategory}-${index}`}
              data={product}
              currentCategory={currentCategory}
              isMobile={isMobile}
              setPopup={setPopup}
            />
          ))
        ) : (
          <div className="w-full relative h-full font-main opacity-90">
            No items there yet :\
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const AdminItems = () => {
  const [currentCategory, setCurrentCategory] = useState("Shop");
  const [popup, setPopup] = useState({state: false, item: null});

  return (
    <>
      <div className="w-[100vw] h-full">
        <div className="w-full h-full relative mt-[calc(52px+40px)] xl:mt-[calc(65px+40px)] px-[16px] xl:px-[6.25rem] pb-14">
          <div className="flex flex-col gap-3 w-full h-auto relative">
            <div className="w-full h-auto flex justify-between items-center">
              <h2 className="font-main font-[600] text-4xl leading-[100%] tracking-wide">
                Items
              </h2>
              <Link
                to={`plus${
                  currentCategory === "Auction"
                    ? "/?auction"
                    : currentCategory === "Gallery"
                    ? "/?gallery"
                    : ""
                }`}
                className="flex items-center gap-2 font-main text-lg text-[#FCCB00] font-[600] tracking-wider relative"
              >
                Add new
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21C11.7167 21 11.4792 20.9042 11.2875 20.7125C11.0958 20.5208 11 20.2833 11 20V13H4C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H11V4C11 3.71667 11.0958 3.47917 11.2875 3.2875C11.4792 3.09583 11.7167 3 12 3C12.2833 3 12.5208 3.09583 12.7125 3.2875C12.9042 3.47917 13 3.71667 13 4V11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H13V20C13 20.2833 12.9042 20.5208 12.7125 20.7125C12.5208 20.9042 12.2833 21 12 21Z"
                    fill="#FCCB00"
                  />
                </svg>
              </Link>
            </div>

            <CategoryTabs
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />

            <div className="min-h-[580px] w-full h-auto relative">
              <ProductList currentCategory={currentCategory} setPopup={setPopup} />
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <Modal isOpen={popup.state}>
        <DeletePopup setPopup={setPopup} popup={popup} />
      </Modal>
    </>
  );
};

export default AdminItems;
