import React, { useEffect, useMemo, useRef, useState } from "react";
import Breadcamp from "../components/Breadcrumb";
import Slider from "../components/Slider";
import classNames from "classnames";
import { createMarkup } from "../utils";
import CardRelated from "../components/CardRelated";
import { Swiper, SwiperSlide } from "swiper/react";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import useResponsive from "../hooks/useResponsive";
import { galleryProducts } from "../utils/data";

const GalleryProduct = () => {
  const { hash } = useParams();
  const sliderRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const textContainerRef = useRef(null);

  const { isBigLaptop, isLaptop } = useResponsive();

  // Current product and related products
  const currentData = useMemo(
    () => galleryProducts.find((item) => item.hash === hash),
    [hash]
  );

  const relatedData = useMemo(
    () => galleryProducts.filter((item) => item.hash !== hash),
    [hash]
  );

  const [indexesRelated, setIndexesRelated] = useState([]);
  const [isSticky, setIsSticky] = useState(false);

  // Generate 4 unique random related product indexes
  useEffect(() => {
    const generateRandomIndexes = () => {
      const indexes = new Set();
      while (indexes.size < 4 && indexes.size < relatedData.length) {
        indexes.add(Math.floor(Math.random() * relatedData.length));
      }
      return Array.from(indexes);
    };

    if (relatedData.length > 0) {
      setIndexesRelated(generateRandomIndexes());
    }
  }, [relatedData]);

  // Check if sticky layout is needed
  useEffect(() => {
    if (sliderContainerRef.current && textContainerRef.current && !isBigLaptop) {
      const isSliderTaller =
        sliderContainerRef.current.offsetHeight >
        textContainerRef.current.offsetHeight * 1.3;
      setIsSticky(isSliderTaller);
    }
  }, [isBigLaptop]);

  if (!currentData) return <div>Product not found</div>;

  return (
    <>
      <div className="w-[100vw] h-full">
        <div className="w-full h-full relative mt-[calc(52px+25px)] xl:mt-[calc(65px+25px)] px-[16px] xl:px-[6.25rem]">
          <div className="w-full h-full relative mt-[25px]">
            <Breadcamp difRoute="Gallery" />

            {/* Product Section */}
            <div className="flex xl:flex-row flex-col w-full h-auto relative mt-[34px] xl:justify-between xl:items-start items-center 2xl:gap-[120px] gap-[60px]">
              <Slider
                data={currentData}
                sliderRef={sliderRef}
                sliderContainerRef={sliderContainerRef}
              />

              {/* Product Details */}
              <div
                className={classNames("w-full h-max flex flex-col gap-8", {
                  "xl:sticky xl:top-[80px]": isSticky,
                })}
                ref={textContainerRef}
              >
                <h2 className="uppercase font-main font-[600] 2xl:text-6xl sm:text-5xl text-3xl text-white">
                  {currentData.title}
                </h2>
                <div className="w-full h-auto flex flex-col gap-6 relative">
                  <div
                    className="w-full h-auto flex flex-col gap-4 relative font-main font-[400] tracking-wide 2xl:text-lg text-base text-[#CFCFCF] 2xl:max-w-[90%] text-pretty pt-0.5 pb-4"
                    dangerouslySetInnerHTML={createMarkup(currentData.description)}
                  />
                </div>
              </div>
            </div>

            {/* Related Products Section */}
            <div className="w-full h-auto relative my-[90px] flex flex-col 2xl:gap-10 xl:gap-8 gap-4 overflow-hidden">
              <h2 className="font-main 2xl:text-5xl xl:text-4xl text-2xl font-[600] leading-[43.2px] text-white uppercase tracking-wide">
                Related Arts
              </h2>

              {!isLaptop ? (
                <div className="w-full h-auto grid grid-cols-4 gap-7">
                  {(indexesRelated || []).map((index) => (
                    <CardRelated
                      fixHeight
                      difRoute="gallery"
                      noPrice
                      key={index}
                      data={relatedData[index]}
                    />
                  ))}
                </div>
              ) : (
                <Swiper
                  slidesPerView="auto"
                  spaceBetween={20}
                  className="w-full h-auto flex items-center !mx-0"
                >
                  {(indexesRelated || []).map((index) => (
                    <SwiperSlide
                      className="sm:!w-[316px] !w-[276px] !h-auto"
                      key={index}
                    >
                      <CardRelated
                        fixHeight
                        difRoute="gallery"
                        noPrice
                        data={relatedData[index]}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        </div>
        <ContactForm />
        <Footer />
      </div>
    </>
  );
};

export default GalleryProduct;