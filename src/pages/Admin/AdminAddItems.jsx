import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Dropzone from "../../components/Dropzone";
import Input from "../../components/Input";
import InputLabel from "../../components/InputLabel";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import BtcIcon from "../../components/subComponents/BtcIcon";
import TextEditor from "../../components/TextEditor";
import { useForm } from "react-hook-form";

const AdminAddItems = () => {
  const [searchParams] = useSearchParams();
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [type, setType] = useState(searchParams.toString().replace("=", ""));

  const inputCSS =
    "bg-[#212121] w-full py-[10px] px-3 rounded-xl outline-none leading-[23px] border-[1px] border-[#ffffff05] tracking-wide transition-colors duration-[250ms] font-main placeholder-[#707070] focus:placeholder-[#ffffff00]";

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (newImages) => {
    setImages(newImages);
    clearErrors("images");
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

  function changeType(settedType) {
    setType(settedType);
    setValue("itemType", settedType);
  }

  const onSubmit = (data) => {
    if (!images.length) {
      setError("images", {
        type: "manual",
        message: "At least 1 image is required",
      });
      return;
    }
    console.log({ ...data, images });
  };

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
            Items adding
          </h2>
        </div>

        <div className="w-full h-auto flex xl:gap-[125px] gap-[60px] xl:flex-row flex-col justify-between">
          {/* Left */}
          <div className="w-full h-auto flex flex-col relative">
            <div
              className={`${
                errors.images
                  ? ""
                  : "grid grid-cols-5 sm:grid-rows-6 grid-rows-5 sm:gap-4 gap-2.5"
              }`}
            >
              <AnimatePresence initial={false}>
                {!images.length ? (
                  <motion.div
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                    className={`${
                      errors.images
                        ? "flex flex-col gap-3"
                        : "col-span-5 sm:row-span-6 row-span-5"
                    } max-h-[600px]`}
                  >
                    <Dropzone data={images} setData={handleImageChange} />
                    {errors.images && (
                      <p className="text-red-500 text-xs">
                        {errors.images.message}
                      </p>
                    )}
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
                            src={image.src}
                            alt={`Uploaded-${image.name}`}
                            className="w-full h-full object-cover rounded-3xl max-h-[600px]"
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
                          src={image.src}
                          alt={image.name}
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-auto flex flex-col gap-6"
          >
            {/* Input fields */}
            <div className="flex flex-col gap-3 w-full h-auto relative">
              <InputLabel
                id="titleA"
                label="Title"
                placeholder="Painting-Embroidery «Unknown Bitcoin»"
                type="text"
                name="title"
                register={register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}
            </div>

            {/* Price, Size, Delivery */}
            {type === "gallery" ? (
              <></>
            ) : type === "auction" ? (
              <>
                <div className="flex flex-col gap-3 w-full h-auto relative">
                  <div className="flex flex-col w-full h-auto gap-1.5">
                    <label
                      htmlFor="minPriceA"
                      className="text-white text-sm leading-[16.8px] font-main tracking-wide"
                    >
                      Price
                    </label>
                    <div className="w-full h-auto flex items-center gap-3">
                      <Input
                        id="minPriceA"
                        placeholder="min."
                        type="number"
                        {...register("minPrice", {
                          required: "min. price is required",
                        })}
                        className={inputCSS}
                      />
                      -
                      <Input
                        id="maxPriceA"
                        placeholder="max."
                        type="number"
                        {...register("maxPrice", {
                          required: "max. price is required",
                        })}
                        className={inputCSS}
                      />
                    </div>
                  </div>
                  {(errors.minPrice || errors.maxPrice) && (
                    <div className="w-full h-auto flex justify-between gap-9 items-start">
                      <p className="text-red-500 text-xs w-full text-left">
                        {errors.minPrice.message}
                      </p>
                      <p className="text-red-500 text-xs w-full text-left">
                        {errors.maxPrice.message}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 w-full h-auto relative">
                <InputLabel
                  id="priceA"
                  placeholder="0.0013"
                  label="Price"
                  icon={<BtcIcon />}
                  type="number"
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs">{errors.price.message}</p>
                )}
              </div>
            )}

            {type === "auction" && (
              <div className="flex flex-col gap-3 w-full h-auto relative">
                <InputLabel
                  id="endTimeA"
                  placeholder="30x40"
                  label="End time"
                  type="datetime-local"
                  {...register("endTime", {
                    required: "End time is required",
                  })}
                />
                {errors.endTime && (
                  <p className="text-red-500 text-xs">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            )}

            {type !== "gallery" && (
              <>
                <div className="flex flex-col gap-3 w-full h-auto relative">
                  <InputLabel
                    id="sizeA"
                    placeholder="30x40"
                    label="Size"
                    type="text"
                    {...register("size", { required: "Size is required" })}
                  />
                  {errors.size && (
                    <p className="text-red-500 text-xs">
                      {errors.size.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3 w-full h-auto relative">
                  <InputLabel
                    id="deliveryA"
                    label="Delivery"
                    placeholder="International-Free"
                    type="text"
                    {...register("delivery", {
                      required: "Delivery information is required",
                    })}
                  />
                  {errors.delivery && (
                    <p className="text-red-500 text-xs">
                      {errors.delivery.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <TextEditor
              description=""
              placeholder="Your product description"
              onChange={(desc) => setValue("description", desc)}
            />

            {/* Radio buttons */}
            <div className="flex flex-col w-full h-auto gap-3 relative">
              {["Usual", "Auction", "Gallery"].map((category, index) => (
                <label
                  key={category}
                  onClick={() =>
                    changeType(
                      category === "Usual" ? "" : category.toLowerCase()
                    )
                  }
                  className="relative flex items-center cursor-pointer justify-between select-none"
                >
                  <input
                    defaultChecked={
                      type === category.toLowerCase() || (!type && index === 0)
                    }
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

export default AdminAddItems;
