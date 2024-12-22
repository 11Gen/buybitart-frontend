import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useAnimate,
  usePresence,
} from "framer-motion";

const Payment = ({ cart }) => {
  const [typePay, setTypePay] = useState("crypto");
  const [totalPrice, setTotalPrice] = useState(0);

  const inputCSS = `w-full h-[44px] rounded-xl py-[10px] px-3 bg-[#212121] tracking-wide font-main border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00] focus:outline-none font-[300]`;
  const textareaCSS = `w-full h-[194px] resize-none rounded-xl py-[10px] px-3 bg-[#212121] tracking-wide font-main border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00] focus:outline-none font-[300]`;
  const labelCSS = `text-white text-sm font-[300] leading-[16.8px] font-main tracking-wide`;

  const getPrice = (txt) =>
    Number(txt?.includes("BTC") ? txt.replace("BTC", "") : txt);

  useEffect(() => {
    if (cart.length) {
      setTotalPrice(
        cart.reduce((a, b) => a + getPrice(b.price) * b.quantity, 0)
      );
    }
  }, [cart]);

  return (
    <div className="w-[100vw] h-full">
      <div className="w-full h-full relative mt-[calc(52px+40px)] xl:mt-[calc(65px+40px)] px-[16px] xl:px-[6.25rem] pb-14">
        <div className="flex xl:flex-row flex-col w-full h-auto 2xl:gap-[150px] lg:gap-[100px] gap-[45px] justify-between">
          {/* left side */}
          <form className="w-full h-auto flex flex-col gap-8">
            <div className="flex w-full h-auto gap-6 flex-col">
              <div className="flex sm:flex-row flex-col gap-5 h-auto w-full">
                <div className="flex flex-col gap-1.5 w-full h-auto">
                  <label htmlFor="Fname" className={labelCSS}>
                    First name *
                  </label>
                  <Input
                    className={inputCSS}
                    autocomplete="given-name"
                    placeholder="Tyler"
                    id="Fname"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full h-auto">
                  <label htmlFor="Lname" className={labelCSS}>
                    Last name *
                  </label>
                  <Input
                    className={inputCSS}
                    autocomplete="family-name"
                    placeholder="Durden"
                    id="Lname"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-full h-auto">
                <label htmlFor="countryInp" className={labelCSS}>
                  Country / Region *
                </label>
                <Input
                  className={inputCSS}
                  placeholder="Italy"
                  id="countryInp"
                  type="country"
                />
              </div>
              <div className="flex flex-col gap-1.5 w-full h-auto">
                <label htmlFor="streetInp" className={labelCSS}>
                  Street address *
                </label>
                <Input
                  className={inputCSS}
                  placeholder="Street name / (apartment, suite)"
                  id="streetInp"
                  type="country"
                  autocomplete="address-line1"
                />
                <Input
                  className={`${inputCSS} mt-[18px]`}
                  placeholder="Town / City"
                  id="apartmentInp"
                  type="country"
                  autocomplete="address-level2"
                />
              </div>
              <div className="flex flex-col gap-1.5 w-full h-auto">
                <label htmlFor="zipInp" className={labelCSS}>
                  ZIP Code *
                </label>
                <Input
                  className={inputCSS}
                  autocomplete="postal-code"
                  placeholder="ZIP Code"
                  id="zipInp"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1.5 w-full h-auto">
                <label htmlFor="phoneInp" className={labelCSS}>
                  Phone *
                </label>
                <Input
                  className={inputCSS}
                  placeholder="Phone"
                  id="phoneInp"
                  type="tel"
                  autocomplete="tel"
                />
              </div>
              <div className="flex flex-col gap-1.5 w-full h-auto">
                <label htmlFor="emailInp" className={labelCSS}>
                  Email address *
                </label>
                <Input
                  className={inputCSS}
                  autocomplete="email username"
                  placeholder="Email address"
                  id="emailInp"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-1.5 w-full h-auto">
                <label htmlFor="notesInp" className={labelCSS}>
                  Order notes (optional)
                </label>
                <TextArea
                  className={textareaCSS}
                  autocomplete="postal-code"
                  placeholder="Order notes"
                  id="notesInp"
                />
              </div>
            </div>
          </form>
          {/* right side */}
          <div className="xl:w-[calc(100%-25cqw)] w-full h-auto flex flex-col gap-8 items-center">
            {/* type */}
            <div className="flex xl:sticky relative shadow-xl xl:top-[81px] justify-between gap-1 bg-[#FFFFFF1A] backdrop-blur-md z-[2] p-2 w-full max-w-[336px] mx-auto rounded-xl h-[47px] font-main text-white text-base items-center">
              <button
                onClick={() => setTypePay("crypto")}
                className="w-full h-auto text-center"
              >
                Crypto pay
              </button>
              <button
                onClick={() => setTypePay("card")}
                className="w-full h-auto text-center"
              >
                Card pay
              </button>

              <div
                className={`bg-[#A2A2A24D] h-[31px] rounded-[7px] w-[164px] absolute transition-[left] duration-300 top-2 ${
                  typePay === "crypto"
                    ? "left-2"
                    : "left-[calc(100%-0.5rem-164px)]"
                } z-[1]`}
              />
            </div>

            {/* product */}
            <div className="flex flex-col w-full h-auto gap-2 relative">
              {(cart || []).map((item, index) => (
                <div className="w-full h-auto flex justify-between font-main sm:text-base text-sm font-[300]" key={index}>
                  <div className="flex gap-4 w-auto h-auto">
                    <span className="w-auto sm:max-w-[350px] max-w-[180px] inline-block whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.title}
                    </span>
                    <span className="tracking-widest opacity-70">
                      x{item.quantity}
                    </span>
                  </div>
                  <span className="text-[#FCCB00]">{item.price}</span>
                </div>
              ))}
            </div>

            {/* shipping */}
            <div className="flex flex-col w-full h-auto gap-6">
              <div className="flex flex-col gap-4 w-full h-auto">
                <h3 className="font-main font-[600] sm:text-2xl text-lg tracking-wide">
                  Shiping method
                </h3>
                <div className="flex flex-col gap-3 w-full h-auto">
                  <div className="bg-[#FFFFFF1A] w-full sm:h-[72px] h-[62px] rounded-xl p-6 gap-4 flex items-center font-main">
                    <div className="w-[14px] h-[14px] outline outline-1 outline-offset-4 outline-white bg-white rounded-full opacity-90" />
                    <span className="sm:text-lg text-base font-[400] tracking-wide opacity-90">
                      International - Free
                    </span>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {typePay === "card" && (
                  <motion.div
                    className="flex flex-col gap-4 my-1 w-full h-auto relative"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    layout
                  >
                    <h3 className="font-main font-[600] sm:text-2xl text-lg tracking-wide">
                      Card Information
                    </h3>
                    <form className="flex flex-col gap-4 w-full h-auto relative">
                      <div className="flex flex-col gap-1.5 w-full h-auto">
                        <label htmlFor="nameCardInp" className={labelCSS}>
                          Name on card
                        </label>
                        <Input
                          className={inputCSS}
                          placeholder="Name"
                          id="nameCardInp"
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 w-full h-auto">
                        <label htmlFor="numberCardInp" className={labelCSS}>
                          Card number
                        </label>
                        <Input
                          className={inputCSS}
                          placeholder="Card number"
                          id="numberCardInp"
                          type="text"
                        />
                      </div>

                      <div className="flex gap-4 items-center w-full justify-between">
                        <div className="flex flex-col gap-1.5 w-full h-auto">
                          <label htmlFor="expCardInp" className={labelCSS}>
                            Expiry
                          </label>
                          <Input
                            className={inputCSS}
                            placeholder="Expiry"
                            id="expCardInp"
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 w-full h-auto">
                          <label htmlFor="cvvCardInp" className={labelCSS}>
                            CVV
                          </label>
                          <Input
                            className={inputCSS}
                            placeholder="CVV"
                            id="cvvCardInp"
                            type="text"
                          />
                        </div>
                      </div>
                    </form>
                    <div className="w-full h-[17px] flex justify-center items-center relative">
                      <div className="w-full h-[1px] bg-[#303030]" />
                      <span className="font-main absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] bg-[#000] text-sm leading-[16.8px] font-[500] tracking-wider text-[#707070] w-[45px] flex justify-center items-center">
                        Or
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 w-full h-auto">
                      <button
                        id="applePay"
                        className="w-full h-[50px] rounded-lg py-2 px-4 bg-white flex justify-center items-center hover:bg-white/90 transition-colors duration-300"
                      >
                        <img
                          src="/ApplePay.png"
                          alt="apple"
                          draggable="false"
                          className="w-[52px] h-[26px] object-contain"
                        />
                      </button>
                      <button
                        id="googlePay"
                        className="w-full h-[50px] rounded-lg py-2 px-4 bg-white flex justify-center items-center hover:bg-white/90 transition-colors duration-300"
                      >
                        <img
                          src="/GooglePay.png"
                          alt="google"
                          draggable="false"
                          className="w-[56px] h-[25px] object-contain"
                        />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* total */}
              <div className="w-full h-auto flex flex-col gap-1">
                <div className="font-main text-base font-[300] tracking-wide w-full flex justify-between items-center">
                  <span className="text-[#CFCFCF]">Total</span>
                  <span className="text-white font-[500]">
                    {totalPrice.toFixed(4) + "BTC"}
                  </span>
                </div>
                <div className="font-main text-base font-[300] tracking-wide w-full flex justify-between items-center">
                  <span className="text-[#CFCFCF]">To pay</span>
                  <span className="text-[#FCCB00] font-[500]">
                    {totalPrice.toFixed(4) + "BTC"}
                  </span>
                </div>
              </div>

              {/* privacy */}
              <p className="text-xs font-main text-[#CFCFCF]/90 tracking-wide">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our{" "}
                <Link to="/privacy" className="underline">
                  privacy policy
                </Link>
                .
              </p>

              {/* pay */}
              <button className="flex font-main text-lg rounded-[1.25rem] w-full h-[43px] bg-[#FCCB00] text-[#522700] font-[600] items-center justify-center hover:bg-[#D4A900] hover:text-[#1C1600] transition-colors duration-[250ms]">
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
