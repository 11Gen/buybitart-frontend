import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Model from "../components/Model";
import CardShow from "../components/CardShow";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import useResponsive from "../hooks/useResponsive";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
  const btcRef = useRef();
  const { isBigLaptop, isSmallMobile, isMobile } = useResponsive();

  useEffect(() => {
    // GSAP Animations
    // gsap.to(".stickySection", {
    //   scrollTrigger: {
    //     trigger: ".stickySection",
    //     start: "top top",
    //     end: () =>
    //       "+=" +
    //       (window.innerHeight +
    //         document.querySelector(".website-content").offsetHeight * 0.5),
    //     scrub: 1,
    //     pin: true,
    //   },
    //   y: 250,
    //   scale: 0.75,
    //   rotation: -15,
    //   ease: "power3.out",
    // });

    // gsap.fromTo(
    //   ".website-content",
    //   { x: -100, scale: 0.3, rotation: 15 },
    //   {
    //     scrollTrigger: {
    //       trigger: ".website-content",
    //       start: "top 200%",
    //       end: "top 75%",
    //       scrub: 1,
    //     },
    //     x: 0,
    //     scale: 1,
    //     rotation: 0,
    //     ease: "power3.out",
    //   }
    // );

    if (!isBigLaptop)
      gsap.to(".horizontalSection", {
        x: () => -document.querySelector(".cardsCont").offsetWidth,
        scrollTrigger: {
          trigger: ".website-content",
          start: `top top`,
          end: `+=${window.innerHeight}`,
          pin: true,
          // markers: true,
          scrub: 1,
        },
      });
  }, []);

  return (
    <>
      <div className="w-[100vw] h-full">
        {/* Sticky Section */}
        <section className="stickySection relative w-[100vw] h-auto xl:min-h-[100svh] bg-black pt-[4.063rem] px-[16px] xl:px-[6.25rem]">
          <div className="w-full h-[100%] xl:h-[100vh] flex xl:flex-row flex-col-reverse items-center justify-between relative">
            <div className="w-full h-auto relative xl:mt-[0px] mt-[20px] z-[1]">
              <div className="w-auto xl:max-w-[413px] h-auto relative flex flex-col">
                <h1
                  className={`font-main font-[700] ${
                    isSmallMobile ? "text-7xl" : "text-8xl"
                  } sm:text-9xl uppercase sm:tracking-wider xl:text-left text-center w-auto`}
                >
                  5ksana
                </h1>
                <span className="mt-2 sm:mt-6 font-main font-[400] text-lg sm:text-[2.5rem] uppercase sm:leading-[3rem] sm:tracking-wider xl:text-left text-center">
                  Bitcoin Artist & <br className="xl:block hidden" /> Fashion
                  Designer
                </span>
                <Link
                  to="/gallery"
                  className="font-slab xl:w-max w-full xl:max-w-max max-w-[90%] xl:mx-0 mx-auto text-center text-base uppercase mt-5 sm:mt-[55px] border-[1px] border-[#fff] py-2.5 px-6 rounded-[1.8rem] font-[500] transition duration-[250ms] hover:text-[#522700] hover:bg-[#FCCB00] hover:border-[#FCCB00]"
                >
                  Browse Gallery
                </Link>
                <button className="w-[130px] opacity-80 h-[130px] flex items-center justify-center relative rounded-full mt-14 sm:mt-[70px] xl:mx-0 mx-auto group">
                  <img
                    src="/roundedScroll.svg"
                    alt=""
                    className="w-full h-auto absolute inset-0 object-contain pointer-events-none group-hover:rotate-[360deg] transition-transform duration-1000"
                    draggable={false}
                  />
                  <img
                    src="/down-arrow.svg"
                    alt=""
                    className="w-[28px] h-[28px] object-contain group-hover:scale-110 transition-transform duration-700"
                  />
                </button>
              </div>
            </div>

            <div className="w-full h-full relative">
              <div className="absolute w-[35rem] h-[35rem] bg-[#FFB82BB2] left-[50%] xl:left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full webkitBlurIos250 pointer-events-none xl:scale-100 scale-[0.5] sm:scale-[0.75]" />
              <div className="w-full h-full relative flex justify-center items-center">
                <Model btcRef={btcRef} />
              </div>
            </div>
          </div>

          <div className="tracker"></div>
        </section>

        {/* Website Content */}
        <section className="website-content z-[1] relative w-full h-auto overflow-hidden">
          <div
            className="w-full h-auto sm:h-[100vh] sm:pb-0 pb-10 relative"
            // style={
            //   {
            //     // backgroundImage: "url(/bgLight.svg)",
            //     // backgroundAttachment: "fixed",
            //     // backgroundSize: "cover",
            //   }
            // }
          >
            <div className="w-auto xl:w-max h-auto xl:h-[100vh] xl:mt-0 mt-[120px] relative xl:flex-row flex-col flex xl:justify-center xl:items-center horizontalSection">
              <h2
                className={`font-extra w-auto xl:w-[100vw] text-center uppercase ${
                  isSmallMobile ? "text-4xl" : "text-5xl"
                } sm:text-8xl xl:text-[10rem] leading-[100%] relative`}
              >
                Explore The <br /> Collection
              </h2>
              <div className="min-w-[100vw] flex sm:justify-center items-center px-[16px] xl:px-[6.25rem] cardsCont xl:mt-0 sm:mt-14 mt-7">
                <div className="w-full h-auto flex gap-6 xl:gap-20 items-center">
                  {isMobile ? (
                    <Swiper
                      slidesPerView={"auto"}
                      spaceBetween={30}
                      className={`w-max pr-6`}
                    >
                      <SwiperSlide className="!w-[316px]">
                        <CardShow />
                      </SwiperSlide>
                      <SwiperSlide className="!w-[316px]">
                        {" "}
                        <CardShow />
                      </SwiperSlide>
                    </Swiper>
                  ) : (
                    <>
                      <CardShow />
                      <CardShow />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <ContactForm decor />
          <Footer />
        </section>
      </div>
    </>
  );
};

export default Home;
