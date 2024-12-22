import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import useResponsive from "../hooks/useResponsive";

const variants = {
  show: { opacity: 1, visibility: "visible" },
  hide: { opacity: 0, visibility: "hidden" },
};

const Modal = ({ children, isOpen }) => {
  const lenis = useLenis();
  const { isMobile, isBigLaptop } = useResponsive();

  useEffect(() => {
    if (!isMobile) {
      if (isOpen) {
        document.documentElement.style.overflow = "hidden";
        document.querySelector('.navBar').style.paddingRight = isBigLaptop ? "" : "calc(6.25rem + 14px)";
        lenis?.stop();
        ScrollTrigger.normalizeScroll(false);
      } else {
        lenis?.start();
        document.documentElement.style.overflow = "";
        document.querySelector('.navBar').style.paddingRight = "";
        ScrollTrigger.normalizeScroll(true);
      }

      return () => {
        lenis?.start();
        ScrollTrigger.normalizeScroll(true);
      };
    } else {
      if (isOpen) document.documentElement.style.overflow = "hidden";
      else document.documentElement.style.overflow = "";
    }
  }, [isOpen, lenis, isMobile]);

  return (
    <motion.div
      variants={variants}
      animate={isOpen ? "show" : "hide"}
      className={`w-full h-full fixed inset-0 backdrop-blur-lg bg-[#00000080] flex justify-center items-center px-[16px] xl:px-[6.25rem] z-[100000] ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-500`}
    >
        {children}
    </motion.div>
  );
};

export default Modal;
