import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Shop from "./pages/Shop";
import { ReactLenis } from "lenis/react";
import Product from "./pages/Product";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef();

  const router = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/shop",
      element: <Shop />
    },
    {
      path: "/shop/:hash",
      element: <Product />
    }
  ]);

  const location = useLocation();

  useEffect(() => {
    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    ScrollTrigger.clearScrollMemory("manual");
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    ScrollTrigger.normalizeScroll(true);
    window.scrollTo(0, 0);
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
          {React.cloneElement(router, { key: location.pathname })}
        </AnimatePresence>
      </ReactLenis>
    </>
  );
};

export default App;
