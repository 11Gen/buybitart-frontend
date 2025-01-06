import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Dropzone from "../../components/Dropzone";
import Input from "../../components/Input";
import InputLabel from "../../components/InputLabel";
import TextAreaLabel from "../../components/TextAreaLabel";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { products, productsAuction, galleryProducts } from "../../utils/data";

const AdminEditItem = () => {
  const { hash } = useParams();
  const [searchParams] = useSearchParams();
  const [images, setImages] = useState([]);
  const [data, setData] = useState({});
  const type = React.useMemo(
    () => searchParams.toString().replace("=", ""),
    [searchParams]
  );

  const removeImage = useCallback((index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }, []);

  const getPrice = (txt) => {
    if (!txt) return ""; // Return an empty string or default value
    return txt.includes("BTC") ? txt.replace("BTC", "").trim() : txt;
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: index * 0.1 },
    }),
    exit: (index) => ({
      opacity: 0,
      scale: 0,
      transition: { delay: index * 0.05 },
    }),
  };

  useEffect(() => {
    switch (type) {
      case "auction":
        const itemA = productsAuction.find((item) => item.hash === hash);
        setData({ ...itemA });
        setImages([...itemA.images]);
        break;
      case "gallery":
        const itemG = galleryProducts.find((item) => item.hash === hash)
        setData({ ...itemG });
        setImages([ ...itemG.images ])
        break;
      default:
        const item = products.find((item) => item.hash === hash)
        setData({ ...item });
        setImages([ ...item.images ])
    }

    return () => setData({});
  }, [type, hash]);

  return (
    <div className="w-[100vw] h-full">
      <div className="w-full h-full relative px-[16px] xl:px-[6.25rem] 2xl:max-w-[85%] 2xl:mx-auto pb-28">
        <div className="flex items-center gap-3 w-full mb-8 mt-[calc(52px+20px)] xl:mt-[calc(65px+20px)]">
          <Link
            to={-1}
            className="w-[30px] h-[30px] flex items-center justify-center opacity-80 hover:scale-x-125 transition-transform duration-300"
          >
            <MdArrowBack size={24} />
          </Link>
          <h2 className="font-main font-[600] text-4xl leading-[100%] tracking-wide">
            Edit Item
          </h2>
        </div>

        <div className="w-full h-auto flex xl:gap-[125px] gap-[60px] xl:flex-row flex-col justify-between">
          {/* Left */}
          <div className="w-full h-auto flex flex-col relative">
            <div className="grid grid-cols-5 sm:grid-rows-6 grid-rows-5 sm:gap-4 gap-2.5">
              <AnimatePresence initial={false}>
                {!images.length ? (
                  <motion.div
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                    className="col-span-5 sm:row-span-6 row-span-5 max-h-[600px]"
                  >
                    <Dropzone data={images} setData={setImages} />
                  </motion.div>
                ) : (
                  images.map(
                    (image, index) =>
                      index <= 4 && (
                        <motion.div
                          key={index}
                          layout
                          custom={index}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={containerVariants}
                          className={`relative rounded-3xl ${
                            !index
                              ? "col-span-5 sm:row-span-6 row-span-5 max-h-[600px]"
                              : "sm:row-start-7 row-start-6 max-h-[83px] sm:max-h-[110px]"
                          }`}
                        >
                          <img
                            src={typeof image === 'object' ? image.src : image}
                            alt={`Uploaded-${index}`}
                            className="w-full h-full object-cover rounded-3xl"
                            draggable={false}
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className={`absolute z-[1] backdrop-blur-xl group rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 active:scale-90 ${
                              !index ? "w-[30px] h-[30px]" : "w-[24px] h-[24px]"
                            } bg-[#0000003d] flex items-center justify-center -right-2 -top-2 border-[1px] border-[#FFFFFF1A]`}
                          >
                            <img
                              src="/close.svg"
                              alt="Remove"
                              className={`${
                                !index
                                  ? "w-[20px] h-[20px]"
                                  : "w-[17px] h-[17px]"
                              } group-hover:rotate-90 transition-transform duration-300 object-contain`}
                              draggable={false}
                            />
                          </button>
                        </motion.div>
                      )
                  )
                )}
                {images.length > 0 && images.length < 6 && (
                  <motion.div
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                    className="sm:row-start-7 row-start-6 rounded-3xl"
                  >
                    <Dropzone data={images} setData={setImages} autoCSS />
                  </motion.div>
                )}
                {images.length >= 6 && (
                  <motion.div
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                    className="sm:row-start-7 group relative row-start-6 rounded-3xl flex items-center justify-center font-main text-xl bg-[#ffffff1A] font-[500] tracking-widest"
                  >
                    +{images.length - 5}
                    <div className="absolute opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-[opacity,visibility] duration-500 w-max rounded-3xl z-[3] top-[-110px] right-[5px] h-[90px] bg-[#1a1a1a] flex items-center gap-3 p-1">
                      {images.slice(5).map((image, index) => (
                        <img
                          src={typeof image === 'object' ? image.src : image}
                          alt={`uploaded-additional-${index}`}
                          key={index}
                          className="w-full max-w-[82px] h-full object-cover rounded-3xl"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right */}
          <form className="w-full h-auto flex flex-col gap-6">
            {/* Input fields */}
            <div className="flex flex-col w-full h-auto gap-1.5">
              <label
                htmlFor="titleA"
                className="text-white text-sm leading-[16.8px] font-main tracking-wide"
              >
                Title
              </label>
              <Input
                id="titleA"
                placeholder="Painting-Embroidery «Unknown Bitcoin»"
                type="text"
                defaultValue={data.title}
                className="bg-[#212121] py-[10px] px-3 rounded-xl outline-none leading-[23px] border-[1px] border-[#ffffff05] tracking-wide transition-colors duration-[250ms] font-main placeholder-[#707070] focus:placeholder-[#ffffff00]"
              />
            </div>

            {/* Price, Size, Delivery */}
            {data.price && (
              <InputLabel
                id="priceA"
                placeholder="0.0013"
                defaultValue={getPrice(data.price) ? getPrice(data.price) : 0}
                label="Price"
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-[calc(50%+11.25px)] -translate-y-1/2 w-auto h-auto"
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
                }
                type="text"
              />
            )}
            <InputLabel
              id="sizeA"
              placeholder="30x40"
              label="Size"
              defaultValue={data.dimensions}
              type="text"
            />
            <InputLabel
              id="deliveryA"
              label="Delivery"
              placeholder="International-Free"
              defaultValue={data.delivery}
              type="text"
            />
            <TextAreaLabel
              id="descA"
              label="Description"
              defaultValue={data.description}
              placeholder="Your product description"
            />

            {/* Radio buttons */}
            <div className="flex flex-col w-full h-auto gap-3 relative">
              {["Usual", "Auction", "Gallery"].map((category) => (
                <label
                  key={category}
                  className="relative flex items-center cursor-pointer justify-between select-none"
                >
                  <input
                    defaultChecked={type === category.toLowerCase()}
                    className="sr-only peer"
                    name="futuristic-radio"
                    type="radio"
                  />
                  <span className="text-white font-main text-base tracking-wide font-[300]">
                    {category}
                  </span>
                  <div className="w-4 h-4 bg-transparent outline outline-1 outline-offset-2 outline-[#909090] rounded-full peer-checked:bg-white peer-checked:outline-[#909090] peer-hover:shadow-lg transition duration-300 ease-in-out" />
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="w-full flex items-center gap-4 justify-between relative h-auto">
              <button
                type="button"
                className="flex font-main rounded-[1.25rem] w-full h-[44px] bg-white text-black font-[600] items-center justify-center hover:bg-[#dddddd] hover:text-[#000]/90 transition-colors duration-[250ms]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex font-main rounded-[1.25rem] w-full h-[44px] bg-[#FCCB00] text-[#522700] font-[600] items-center justify-center hover:bg-[#D4A900] hover:text-[#1C1600] transition-colors duration-[250ms]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminEditItem;
