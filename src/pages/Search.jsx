import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "../components/SearchInput";
import { products, productsAuction, galleryProducts } from "../utils/data";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [isLooking, setIsLooking] = useState(false);

  const placeholders = [
    "Search for Bitcoin-inspired paintings.",
    "Discover crypto-themed sculptures.",
    "Find unique embroidered Bitcoin art.",
    "Explore wooden crypto art boxes.",
    "Looking for creations by 5ksana?",
  ];

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLooking(true);
    
    const results = {
      products: {title: "Shop", data: products.filter(product => product.title.includes(searchText) || product.hash.includes(searchText))},
      productsAuction: {title: "Auction", data: productsAuction.filter(product => product.title.includes(searchText) || product.hash.includes(searchText))},
      productsGallery: {title: "Gallery", data: galleryProducts.filter(product => product.title.includes(searchText) || product.hash.includes(searchText))}
    }

    if(results.products.data.length || results.productsAuction.data.length || results.productsGallery.data.length) setSearchResults(results);
  };

  console.log(searchResults)

  return (
    <div className="w-screen h-full">
      <div className="w-full h-[100svh] relative px-4 xl:px-24 flex flex-col justify-center items-center">
        <div className="w-full h-auto relative flex flex-col items-center">
          <div className="mb-6 sm:mb-12 text-3xl text-center sm:text-5xl dark:text-white font-main font-[300] tracking-wide">
            <AnimatePresence mode="wait">
              {searchText && isLooking ? (
                <motion.h2
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  Results for "{searchText}"
                </motion.h2>
              ) : (
                <motion.h2
                  key="search"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35 }}
                >
                  Search For Anything
                </motion.h2>
              )}
            </AnimatePresence>
          </div>
          <SearchInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
        {Object.keys(searchResults).length ? <div>fdgdf</div> : <></>}
      </div>
    </div>
  );
};

export default Search;
