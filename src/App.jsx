import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Home from "./pages/Home";
import Nav from "./components/Nav";
import Shop from "./pages/Shop";
import { ReactLenis } from "lenis/react";
import Product from "./pages/Product";
import { motion } from "framer-motion";
import useResponsive from "./hooks/useResponsive";
import useLocalStorage from "use-local-storage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App = () => {
  const lenisRef = useRef();
  const [cart, setCart] = useLocalStorage("cart", []);
  const { isMobile } = useResponsive();

  const router = useRoutes([
    {
      path: "/",
      element: <Home setCart={setCart} cart={cart} />,
    },
    {
      path: "/shop",
      element: <Shop setCart={setCart} cart={cart} />,
    },
    {
      path: "/shop/:hash",
      element: <Product setCart={setCart} cart={cart} />,
    },
  ]);

  const location = useLocation();

  useEffect(() => {
    if (!isMobile) {
      function update(time) {
        lenisRef.current?.lenis?.raf(time * 1000);
      }

      gsap.ticker.add(update);

      return () => gsap.ticker.remove(update);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) {
      ScrollTrigger.clearScrollMemory("manual");
      ScrollTrigger.config({ ignoreMobileResize: true });
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    } else {
      history.scrollRestoration = "manual";
    }
  }, [isMobile]);

  return (
    <>
      {!isMobile ? (
        <ReactLenis
          root
          ref={lenisRef}
          options={{
            duration: 2,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: true,
            touchMultiplier: 2,
            autoRaf: false,
            prevent: (node) => node.id === "modal",
          }}
        >
          <Nav cart={cart} setCart={setCart} />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() =>
                setTimeout(
                  () =>
                    lenisRef.current?.lenis?.scrollTo(0, { immediate: true }),
                  50
                )
              }
            >
              {router}
            </motion.div>
          </AnimatePresence>
        </ReactLenis>
      ) : (
        <>
          <Nav cart={cart} setCart={setCart} />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() =>
                setTimeout(() => window.scrollTo(0, 0), 50)
              }
            >
              {router}
            </motion.div>
          </AnimatePresence>
        </>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        hideProgressBar
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
