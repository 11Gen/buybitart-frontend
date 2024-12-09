import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Shop from "./pages/Shop";
import { ReactLenis, useLenis } from "lenis/react";
import Product from "./pages/Product";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App = () => {
  const lenis = useLenis();

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
    if (!lenis) return;

    const update = (time) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

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
        autoRaf={false}
        options={{
          duration: 2,
          easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
          direction: "vertical",
          gestureDirection: "vertical",
          smooth: true,
          smoothTouch: true,
          touchMultiplier: 2,
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
              setTimeout(() => lenis?.scrollTo(0, { immediate: true }), 50)
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
