import classNames from "classnames";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import ReactPlayer from "react-player";

const Slider = ({ data, sliderRef, sliderContainerRef }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const mainSlider = useRef();

  const slides = useMemo(
    () => [data.video ? data.video : null, ...data.images].filter(Boolean),
    [data]
  );

  const handlePrev = useCallback(() => {
    const swiperMain = mainSlider.current?.swiper;
    if (swiperMain) {
      swiperMain.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    const swiperMain = mainSlider.current?.swiper;
    if (swiperMain) {
      swiperMain.slideNext();
    }
  }, []);

  return (
    <div className="w-full 2xl:max-w-[768px] max-w-[628px] 2xl:h-[622px] h-[522px] flex flex-col gap-6 items-center" ref={sliderContainerRef}>
      <Swiper
        spaceBetween={10}
        loop={true}
        ref={mainSlider}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="w-full max-w-[768px] h-[622px] relative rounded-[20px] overflow-hidden"
      >
        {slides.map((item, index) => (
          <SwiperSlide className="h-[427px]" key={index}>
            {item.includes(".mp4") ? (
              <ReactPlayer
                url={item}
                playing={true}
                width="100%"
                height="100%"
                className="w-full h-full object-cover"
                controls
                light={data.images[0]}
              />
            ) : (
              <img
                src={item}
                alt={`slide-${index}`}
                className="w-full h-full max-h-[527px] object-cover object-center"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex w-full justify-center items-center gap-5">
        <button
          className={classNames(
            "w-[40px] h-[40px] transition-opacity duration-[350ms] flex justify-center items-center"
          )}
          onClick={handlePrev}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z"
              fill="white"
            />
          </svg>
        </button>
        <Swiper
          ref={sliderRef}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={20}
          slidesPerView={4}
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          className="w-auto max-w-[344px] h-[71px] relative justify-center items-center flex thumbS !mx-0"
        >
          {slides.map((item, index) => (
            <SwiperSlide
              className="!w-[71px] !h-[71px] rounded-xl overflow-hidden cursor-pointer relative bg-[#FFFFFF1A]"
              key={index}
            >
              <img
                src={item.includes(".mp4") ? data.images[0] : item}
                className={`w-full h-full ${
                  item.includes(".mp4") ? "object-scale-down" : "object-cover"
                }`}
                alt={`thumb-${index}`}
                loading="lazy"
              />
              {item.includes(".mp4") ? (
                <div className="w-[20px] h-[20px] flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dropShadowCustom">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                  >
                    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                      <path
                        d="M 81.73 50.284 c 4.068 -2.349 4.068 -8.22 0 -10.569 L 48.051 20.271 L 14.372 0.827 c -4.068 -2.349 -9.153 0.587 -9.153 5.284 V 45 v 38.889 c 0 4.697 5.085 7.633 9.153 5.284 l 33.679 -19.444 L 81.73 50.284 z"
                        style={{
                          fill: "rgb(255,255,255)",
                        }}
                        strokeLinecap="round"
                      />
                    </g>
                  </svg>
                </div>
              ) : (
                <></>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={classNames(
            "w-[40px] h-[40px] transition-opacity duration-[350ms] flex justify-center items-center"
          )}
          onClick={handleNext}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6 12L8 7.4L9.4 6L15.4 12L9.4 18L8 16.6L12.6 12Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
