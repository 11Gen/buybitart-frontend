import React, { useEffect, useRef } from "react";
import useResponsive from "../hooks/useResponsive";

const Loader = () => {
  const { isSmallMobile } = useResponsive();
  const loaderRef = useRef();

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (loaderRef.current) {
//         loaderRef.current.style.opacity = "0";
//         loaderRef.current.style.pointerEvents = "none";
//         loaderRef.current.style.zIndex = "-1";
//       }
//     }, 700);

//     return () => clearTimeout(timeout);
//   }, []);

  return (
    <motion.div
      ref={loaderRef}
      id="loader"
      className="fixed inset-0 w-full h-[100svh] bg-black z-[100110] flex justify-center items-center transition-all duration-500"
      style={{ willChange: "opacity" }}
    >
      <h2
        className={`font-main font-bold ${
          isSmallMobile ? "text-8xl" : "text-9xl"
        } sm:text-9xl uppercase sm:tracking-wider text-center pointer-events-none select-none`}
      >
        5ksana
      </h2>
    </motion.div>
  );
};

export default Loader;
