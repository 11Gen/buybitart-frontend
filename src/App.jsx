import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css"; // Include your CSS file here
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Shop from "./pages/Shop";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/shop",
      element: <Shop />
    },
  ]);

  const location = useLocation();

  return (
    <>
      <Nav />
      <AnimatePresence mode="wait">
        {React.cloneElement(router, { key: location.pathname })}
      </AnimatePresence>
    </>
  );
};

export default App;
