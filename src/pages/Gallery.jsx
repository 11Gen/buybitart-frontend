import React, { useLayoutEffect } from "react";
import Footer from "../components/Footer";
import { galleryProducts, pages } from "../utils/data";
import GalleryCard from "../components/GalleryCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaAnglesDown } from "react-icons/fa6";
import useResponsive from "../hooks/useResponsive";

const Gallery = () => {
  const { isBigLaptop, isSmallMobile } = useResponsive();

  useLayoutEffect(() => {
    if (!isBigLaptop) {
      const galleryContainer = document.getElementById("galleryContainer");
      const galleryPage = document.getElementById("galleryPage");
      const progress = document.getElementById("progress");
      const galleryWidth =
        galleryContainer.offsetWidth - window.innerWidth + 200;
      document.body.style.height =
        galleryContainer.offsetWidth - window.innerWidth / 2 + "px";

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: galleryPage,
          start: "top top",
          end: `+=${galleryWidth} top`,
          pin: true,
          scrub: 1,
        });

        gsap.to(galleryContainer, {
          x: () => -galleryWidth,
          scrollTrigger: {
            start: "top top",
            end: `+=${galleryWidth} top`,
            scrub: 1,
          },
        });

        gsap.to(progress, {
          left: `calc(100% - ${progress.offsetWidth}px)`,
          scrollTrigger: {
            start: "top top",
            end: `+=${galleryWidth} top`,
            scrub: 1,
          },
        });
      });

      return () => {
        ctx.revert();
        document.body.style.height = "";
      };
    }
  }, []);

  return (
    <div className="w-[100vw] h-full" id="galleryPage">
      <div className="w-full xl:h-[100svh] h-full relative px-[16px] xl:px-[6.25rem] pb-14 flex flex-col overflow-x-hidden">
        <div className="w-full h-auto relative flex justify-between items-center mt-[calc(52px+50px)] xl:mt-[calc(65px+50px)] ">
          <h2 className="font-main font-[600] sm:text-4xl text-3xl leading-[100%] uppercase">
            {pages.bitcoinartgallery.sections[0].title}
          </h2>
          <span
            className={`font-main text-[#FCCB00] ${
              isSmallMobile ? "text-sm" : "text-base"
            } sm:text-lg pointer-events-none select-none font-[300] inline-flex gap-1.5 items-center text-nowrap`}
          >
            {pages.bitcoinartgallery.sections[0].description}{" "}
            <FaAnglesDown size={14} />
          </span>
        </div>

        <div
          className="flex flex-col relative w-full xl:flex-1 xl:min-h-[590px] h-full mt-[60px]"
          id="galleryWrapper"
        >
          <div
            className="xl:w-max w-full h-full flex xl:flex-row flex-col gap-8 xl:gap-5"
            id="galleryContainer"
          >
            {(galleryProducts || []).map((item, index) => (
              <GalleryCard data={item} key={index} />
            ))}
          </div>
          <div className="justify-center items-center w-full h-auto pointer-events-none relative xl:flex hidden">
            <div className="w-full h-[1px] bg-[#333333] z-0 relative" />
            <div
              className="w-[390px] h-[1px] z-[10] border-[2px] border-white bg-white rounded-full absolute left-0 top-1/2 -translate-y-1/2"
              id="progress"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
