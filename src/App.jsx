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
import About from "./pages/About";
import Auction from "./pages/Auction";
import Payment from "./pages/Payment";
import AdminItems from "./pages/Admin/AdminItems";
import AdminAddItems from "./pages/Admin/AdminAddItems";
import Gallery from "./pages/Gallery";
import GalleryProduct from "./pages/GalleryProduct";
import AdminNotifications from "./pages/Admin/AdminNotifications";
import AdminContent from "./pages/Admin/AdminContent";
import AdminEditItem from "./pages/Admin/AdminEditItem";

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
    {
      path: "/auction/:hash",
      element: <Auction />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/gallery",
      element: <Gallery />,
    },
    {
      path: "/gallery/:hash",
      element: <GalleryProduct />,
    },
    {
      path: "/payment",
      element: <Payment cart={cart} />,
    },
    {
      path: `${import.meta.env.VITE_ADMIN_ROUTE}/items`,
      element: <AdminItems />,
    },
    {
      path: `${import.meta.env.VITE_ADMIN_ROUTE}/items/plus`,
      element: <AdminAddItems />,
    },
    {
      path: `${import.meta.env.VITE_ADMIN_ROUTE}/items/edit/:hash`,
      element: <AdminEditItem />,
    },
    {
      path: `${import.meta.env.VITE_ADMIN_ROUTE}/content`,
      element: <AdminContent />,
    },
    {
      path: `${import.meta.env.VITE_ADMIN_ROUTE}/notifications`,
      element: <AdminNotifications />,
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
              transition={{ duration: 0.7 }}
              onAnimationComplete={() =>
                setTimeout(() => window.scrollTo(0, 0), 70)
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
