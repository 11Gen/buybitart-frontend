import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import useResponsive from "../hooks/useResponsive";
import { useLocation } from "react-router-dom";

const Modal = ({ children, isOpen }) => {
  const lenis = useLenis();
  const location = useLocation();
  const { isMobile, isBigLaptop } = useResponsive();

  useEffect(() => {
    if (!isMobile) {
      if (isOpen) {
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
      if (isOpen) document.documentElement.style.overflow = "hidden";
      else document.documentElement.style.overflow = "";

      return () => document.documentElement.style.overflow = "";
    }
  }, [isOpen, lenis, isMobile]);

  useEffect(() => {}, [location]);

  return (
    <motion.div
      initial={{ opacity: 0, visibility: "hidden" }}
      animate={{ opacity: 1, visibility: "visible" }}
      exit={{ opacity: 0, visibility: "hidden" }}
      transition={{ duration: 0.3 }}
      style={{ willChange: "opacity, visibility" }}
      className={`w-full h-full fixed inset-0 backdrop-blur-lg bg-[#00000080] flex justify-center items-center px-[16px] xl:px-[6.25rem] z-[100000]`}
    >
      {children}
    </motion.div>
  );
};

export default Modal;
