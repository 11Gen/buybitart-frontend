import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Shop from "./pages/Shop";
import { ReactLenis } from "lenis/react";
import Product from "./pages/Product";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App = () => {
  const lenisRef = useRef();

  const router = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/shop",
      element: <Shop />,
    },
    {
      path: "/shop/:hash",
      element: <Product />,
    },
  ]);

  const location = useLocation();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    ScrollTrigger.clearScrollMemory("manual");
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll(true);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const preventDefault = (e) => {
      if (!e.cancelable) return;
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  return (
    <>
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
        }}
      >
        <Nav />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() =>
              setTimeout(() => lenisRef.current?.lenis?.scrollTo(0, { immediate: true }), 50)
            }
          >
            {router}
          </motion.div>
        </AnimatePresence>
      </ReactLenis>
    </>
  );
};

export default App;
