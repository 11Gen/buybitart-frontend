import React, { useMemo, useRef, useState } from "react";
import Breadcamp from "../components/Breadcrumb";
import Slider from "../components/Slider";
import { productsAuction } from "../utils/data";
import { useParams } from "react-router-dom";
import convert from "convert-length";
import { createMarkup } from "../utils";
import Input from "../components/Input";
import BetCard from "../components/BetCard";
import Footer from "../components/Footer";

const Auction = () => {
  const { hash } = useParams();

  const sliderRef = useRef();
  const sliderContainerRef = useRef(null);
  const textContainerRef = useRef(null);

  const [isFirstTime, setIsFirstTime] = useState(false);

  const currentData = useMemo(
    () => productsAuction.find((item) => item.hash === hash),
    [hash]
  );

  const randomBets = [
    {
      name: "Antonio",
      price: "0.1000BTC",
      time: "19:30",
      id: "325",
    },
    {
      name: "Jerry",
      price: "0.0500BTC",
      time: "10:15",
      id: "33425",
    },
    {
      name: "Billy",
      price: "0.0450BTC",
      time: "7:52",
      id: "3245235",
    },
    {
      name: "Tyler",
      price: "0.0333BTC",
      time: "4:37",
      id: "43325",
    },
    {
      name: "Durden",
      price: "0.0014BTC",
      time: "0:05",
      id: "675325",
    },
  ];

  const [data, setData] = useState(currentData);

  const inchesSize = useMemo(
    () =>
      data.dimensions
        .split("x")
        .map((n) => Number(convert(Number(n), "cm", "in").toFixed(1)))
        .join("x"),
    [data.dimensions]
  );

  return (
    <div className="w-[100vw] h-full">
      <div className="w-full h-full relative mt-[calc(52px+25px)] xl:mt-[calc(65px+25px)] px-[16px] xl:px-[6.25rem] pb-14">
        <div className="w-full h-full relative mt-[25px]">
          <Breadcamp auction />

          <div className="flex xl:flex-row flex-col-reverse w-full h-auto relative mt-[34px] xl:justify-between xl:items-start items-center gap-[100px]">
            <div className="w-full h-auto relative xl:items-start xl:justify-start justify-center items-center flex flex-col gap-14">
              <Slider
                data={data}
                sliderRef={sliderRef}
                sliderContainerRef={sliderContainerRef}
              />

              <div className="w-full h-auto flex gap-5 flex-col">
                <h4 className="font-main 2xl:text-xl xl:text-lg text-base font-[400] text-white">
                  Lot information:
                </h4>

                <div className="w-full h-auto flex flex-col gap-6 relative">
                  <div
                    className="w-full h-auto flex flex-col gap-4 relative font-main font-[400] tracking-wide 2xl:text-lg text-base text-[#CFCFCF] max-w-[90%] text-pretty pt-0.5 pb-4"
                    dangerouslySetInnerHTML={createMarkup(data.description)}
                  />
                  <div className="py-0.5 w-full flex gap-5 h-auto relative">
                    <div className="flex flex-col w-full max-w-[163px] font-[400] 2xl:text-base text-sm leading-[145%]">
                      <span className="text-[#757181]">Dimension (cm):</span>
                      <span className="text-white">{data.dimensions}</span>
                    </div>
                    <div className="flex flex-col w-full max-w-[163px] font-[400] 2xl:text-base text-sm leading-[145%]">
                      <span className="text-[#757181]">
                        Dimension (inches):
                      </span>
                      <span className="text-white">{inchesSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={"w-full h-max flex flex-col gap-8"}
              ref={textContainerRef}
            >
              <h2 className="uppercase font-main font-[600] 2xl:text-6xl sm:text-5xl text-3xl text-white">
                {data.title}
              </h2>
              <div className="w-full h-auto flex flex-col gap-7 relative 2xl:max-w-[93%]">
                <div className="w-full h-auto flex items-start justify-between sm:gap-0 gap-4">
                  <div className="flex flex-col gap-0.5 font-main">
                    <p className="2xl:text-lg sm:text-base text-sm font-[300] text-[#CFCFCF]">
                      Current rate
                    </p>
                    <span className="uppercase sm:text-3xl text-2xl font-[600] text-[#FCCB00]">
                      {data.price}
                    </span>
                  </div>
                  <div className="flex w-auto h-auto relative gap-2">
                    <p className="font-[300] text-[#CFCFCF] 2xl:text-lg sm:text-base text-sm">
                      Remaining auction time:
                    </p>
                    <span className="font-[400] text-white 2xl:text-lg sm:text-base text-sm">
                      02:40:30
                    </span>
                  </div>
                </div>
                <form className="flex flex-col gap-2 w-full h-auto">
                  {isFirstTime && (
                    <>
                      <label
                        htmlFor="nameInp"
                        className="text-white text-sm leading-[16.8px] font-main tracking-wide"
                      >
                        Your Name / Nickname
                      </label>
                      <Input
                        placeholder="Tyler Durden"
                        id="nameInp"
                        type="text"
                        className="w-full h-[50px] font-[300] font-main py-[10px] px-3 bg-[#212121] rounded-xl outline-none border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00] mb-2"
                      />
                    </>
                  )}
                  <label
                    htmlFor="betInp"
                    className="text-white text-sm leading-[16.8px] font-main tracking-wide"
                  >
                    Your Bet
                  </label>
                  <div className="flex 2xl:flex-row flex-col w-full h-auto gap-2 items-center">
                    <Input
                      placeholder={data.price}
                      id="betInp"
                      type="text"
                      className="w-full h-[50px] font-[300] font-main py-[10px] px-3 bg-[#212121] rounded-xl outline-none border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00]"
                    />
                    <button className="flex sm:mt-0 mt-2 font-main rounded-[1.25rem] 2xl:rounded-xl w-full 2xl:w-[250px] h-[43px] 2xl:h-[50px] bg-[#FCCB00] text-[#522700] font-[600] items-center justify-center hover:bg-[#D4A900] hover:text-[#1C1600] transition-colors duration-[250ms]">
                      Place a bet
                    </button>
                  </div>
                </form>

                <div className="flex flex-col gap-3 w-full h-auto mt-1">
                  <label
                    htmlFor="switchInp"
                    className="w-max h-auto flex gap-2 items-center"
                  >
                    <label className="text-base relative inline-block w-[44px] h-[26px]">
                      <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0 inpCheckSwitch"
                        defaultChecked={true}
                        id="switchInp"
                      />
                      <span className="sliderSwitch border-[1px] border-[#212121] absolute inset-0 cursor-pointer bg-[#212121] transition-colors duration-300 rounded-full"></span>
                    </label>
                    <span className="font-main text-white font-[400] text-base">
                      Increase in rate at equal rates
                    </span>
                  </label>
                  <p className="font-main font-[300] text-sm leading-[19.6px] text-[#CFCFCF] text-pretty">
                    If you and another bidder have the same maximum bid, the
                    tiebreaker feature will automatically add another bid
                    increment to the bidder who first activated the tiebreaker
                    feature.
                  </p>
                </div>

                <div className="w-full h-auto flex flex-col mt-1.5 gap-8">
                  <div className="w-full h-auto gap-4 flex flex-col relative">
                    <h4 className="font-main text-white text-base leading-[19.2px] font-[400]">
                      Bet histoty
                    </h4>

                    <div className="w-full h-auto flex flex-col gap-2.5 relative">
                      {(randomBets || []).map((bet) => (
                        <BetCard data={bet} key={bet.id} />
                      ))}
                    </div>
                  </div>
                  <button className="w-auto mx-auto tracking-wide h-auto leading-[19.2px] text-base font-[500] font-main text-[#FCCB00] flex items-center justify-center">
                    View more
                  </button>
                </div>
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
