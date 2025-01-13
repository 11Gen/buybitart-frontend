import React, { useMemo, useRef, useState } from "react";
import Breadcamp from "../components/Breadcrumb";
import Slider from "../components/Slider";
import { productsAuction } from "../utils/data";
import { useParams } from "react-router-dom";
import convert from "convert-length";
import { createMarkup, getPrice } from "../utils";
import Input from "../components/Input";
import BetCard from "../components/BetCard";
import Footer from "../components/Footer";
import Toggle from '../components/Toggle';

const Auction = () => {
  const { hash } = useParams();

  const sliderRef = useRef();
  const sliderContainerRef = useRef(null);
  const textContainerRef = useRef(null);

  const [isFirstTime, setIsFirstTime] = useState(false);

  // Fetch current product data
  const currentData = useMemo(
    () => productsAuction.find((item) => item.hash === hash),
    [hash]
  );

  const increaseRateBid = 0.001;

  // Generate dimensions in inches
  const inchesSize = useMemo(() => {
    const dimensions = currentData?.dimensions.split("x") || [];
    return dimensions
      .map((dim) => Number(convert(Number(dim), "cm", "in").toFixed(1)))
      .join("x");
  }, [currentData?.dimensions]);

  // Static random bets
  const randomBets = useMemo(
    () => [
      { name: "Antonio", price: "0.1000BTC", time: "19:30", id: "325" },
      { name: "Jerry", price: "0.0500BTC", time: "10:15", id: "33425" },
      { name: "Billy", price: "0.0450BTC", time: "7:52", id: "3245235" },
      { name: "Tyler", price: "0.0333BTC", time: "4:37", id: "43325" },
      { name: "Durden", price: "0.0014BTC", time: "0:05", id: "675325" },
    ],
    []
  );

  return (
    <div className="w-full h-full">
      <div className="relative mt-20 px-4 xl:px-24 pb-14">
        <Breadcamp auction />
        <div className="flex flex-col-reverse xl:flex-row items-start gap-24 mt-8">
          {/* Left Section */}
          <div className="flex flex-col gap-14 w-full">
            <Slider
              data={currentData}
              sliderRef={sliderRef}
              sliderContainerRef={sliderContainerRef}
            />
            <div className="flex flex-col gap-5">
              <h4 className="text-white text-lg font-medium">
                Lot Information:
              </h4>
              <div
                className="text-gray-400 text-base"
                dangerouslySetInnerHTML={createMarkup(
                  currentData?.description || ""
                )}
              />
              <div className="flex gap-5">
                <div className="flex flex-col text-sm">
                  <span className="text-gray-600">Dimension (cm):</span>
                  <span className="text-white">{currentData?.dimensions}</span>
                </div>
                <div className="flex flex-col text-sm">
                  <span className="text-gray-600">Dimension (inches):</span>
                  <span className="text-white">{inchesSize}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div
            className="flex flex-col gap-8 w-full xl:max-w-[40%]"
            ref={textContainerRef}
          >
            <h2 className="uppercase text-3xl sm:text-5xl font-bold text-white">
              {currentData?.title}
            </h2>
            <div className="flex flex-col gap-7">
              {/* Auction Info */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">Current rate</p>
                  <span className="text-yellow-400 text-2xl sm:text-3xl font-bold">
                    {getPrice(currentData?.currentPrice) != 0 ? currentData?.currentPrice : currentData?.startPrice}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">
                    Remaining auction time:
                  </p>
                  <span className="text-white text-sm">02:40:30</span>
                </div>
              </div>

              {/* Bet Form */}
              <form className="flex flex-col gap-3">
                {isFirstTime && (
                  <Input
                    label="Your Name / Nickname"
                    placeholder="Tyler Durden"
                    id="nameInput"
                    className="w-full h-[50px] font-[300] font-main py-[10px] px-3 bg-[#212121] rounded-xl outline-none border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00] mb-2"
                    type="text"
                  />
                )}
                <Input
                  label="Your Bet"
                  placeholder={getPrice(currentData?.currentPrice) != 0 ? (getPrice(currentData?.currentPrice) + increaseRateBid).toFixed(4) + "BTC" : (getPrice(currentData?.startPrice) + increaseRateBid).toFixed(4) + "BTC"}
                  id="betInput"
                  className="w-full h-[50px] font-[300] font-main py-[10px] px-3 bg-[#212121] rounded-xl outline-none border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00] mb-2"
                  type="text"
                />
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-3xl py-2.5">
                  Place a bet
                </button>
              </form>

              {/* Tiebreaker Feature */}
              <div className="flex flex-col gap-2">
                <Toggle id="switchInp" label='Increase in rate at equal rates' defaultChecked={true} />
                <p className="text-sm text-gray-400">
                  If you and another bidder have the same maximum bid, the
                  tiebreaker feature will automatically add another bid
                  increment to the bidder who first activated the tiebreaker
                  feature.
                </p>
              </div>

              {/* Bet History */}
              <div className="flex flex-col gap-2.5">
                <h4 className="text-white text-base font-medium mb-2">
                  Bet History
                </h4>
                {randomBets.map((bet) => (
                  <BetCard data={bet} key={bet.id} />
                ))}
                <button className="text-yellow-400 hover:text-yellow-500 mx-auto">
                  View more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auction;
