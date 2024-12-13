import React, { useEffect, useRef, useState } from "react";
import CartItem from "./CartItem";
import { products } from "../utils/data";
import { Link } from "react-router-dom";

const Cart = ({ isCartOpen, cart, setCart, popupClose }) => {
  const [totalPrice, setTotalPrice] = useState(0);

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
    <div
      id="modal"
      className="w-full max-w-[720px] sm:h-full h-auto max-h-[770px] p-4 sm:p-8 rounded-3xl bg-[#23211d6c] backdrop-blur-xl border-[1px] border-[#ffffff05] flex flex-col gap-10"
    >
      <div className="w-full h-full flex flex-col gap-8">
        <div className="flex w-full h-auto items-center justify-between">
          <h4 className="font-main text-2xl leading-[29px] font-[600] uppercase relative">
            Cart

            <span className="absolute font-[200] text-sm top-1/2 -translate-y-1/2 right-[-55px] tracking-wide capitalize opacity-60">{cart.length} items</span>
          </h4>

          <button
            className="w-[24px] h-[24px] flex items-center justify-center"
            onClick={popupClose}
          >
            <img
              src="/close.svg"
              alt=""
              className="w-full h-full object-contain"
              draggable="false"
            />
          </button>
        </div>

          <div
            className="flex flex-col w-full sm:gap-6 gap-8 h-full flex-1 max-h-[540px] overflow-y-auto"
            id="scrollItemsCart"
            style={{
              overflowY: "auto",
              maxHeight: "540px",
            }}
          >
            {cart.length ? (
              cart.map((product, index) => (
                <CartItem
                  data={product}
                  key={index}
                  cart={cart}
                  setCart={setCart}
                />
              ))
            ) : (
              <div className="w-full h-full flex flex-col gap-2 flex-1 justify-center items-center">
                <img
                  src="/empty-box.svg"
                  alt=""
                  className="w-full h-full max-h-[170px] sm:max-h-[225px] object-contain invert opacity-40"
                />
                <p className="font-main sm:text-xl text-lg font-[300] opacity-40">
                  No products added to cart yet.
                </p>
              </div>
            )}
          </div>

        <img
          src="/line.svg"
          alt=""
          className="w-full h-auto object-contain pointer-events-none opacity-40"
          draggable="false"
        />

        <div className="w-full h-auto flex justify-end items-center gap-4">
          <div className="flex gap-1 items-center w-auto">
            <span className="font-main text-base leading-[19px]">Total:</span>
            <div className="flex w-full max-w-[126px] h-[32px] gap-2 p-1 rounded-3xl pr-3 bg-[#FFFFFF26]">
              <img
                src="/priceBTC.svg"
                alt="btc"
                className="w-[24px] h-[24px] object-contain"
                draggable="false"
              />
              <span className="font-main font-[300] text-base ">
                {totalPrice.toFixed(4) + "BTC"}
              </span>
            </div>
          </div>

          <Link
            to="/payment"
            className="w-auto h-[40px] rounded-full py-[10px] px-6 bg-[#FCCB00] text-[#522700] hover:bg-[#D4A900] hover:text-[#1C1600] transition-colors duration-[250ms] font-main font-[600] text-base text-center flex justify-center items-center"
          >
            Pay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
