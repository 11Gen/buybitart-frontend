import React, { useState } from "react";
import Input from "./Input";
import SocialButton from "./SocialButton";

const Auth = ({ isAuthOpen, popupClose, setIsAuthOpen }) => {
  const [type, setType] = useState("login");

  function setLogin() {
    setType("login");
  }

  function setRegister() {
    setType("register");
  }

  return (
    <>
      {type === "login" ? (
        <div className="w-full max-w-[444px] sm:h-full h-auto max-h-[640px] gap-11 p-4 sm:p-8 rounded-3xl bg-[#171717] backdrop-blur-xl border-[1px] border-[#ffffff05] flex flex-col">
          <div className="flex flex-col gap-4 w-full h-auto">
            <button
              onClick={popupClose}
              className="w-[24px] h-[24px] flex items-center justify-center ml-auto opacity-70"
            >
              <img
                src="/close.svg"
                alt="close"
                className="w-[24px] h-[24px] object-contain"
                draggable="false"
              />
            </button>
            <h3 className="font-main text-[32px] leading-[42.2px] font-[500] text-center uppercase tracking-wider">
              Sign In
            </h3>
          </div>

          <form className="w-full h-auto flex flex-col gap-6 relative">
            <div className="w-full h-auto flex flex-col gap-8">
              <div className="w-full h-auto flex flex-col gap-5">
                <div className="flex flex-col w-full h-auto gap-1.5">
                  <label
                    htmlFor="emailL"
                    className="text-white text-sm leading-[16.8px] font-main tracking-wide"
                  >
                    Email *
                  </label>
                  <Input
                    id="emailL"
                    placeholder="Email"
                    type="email"
                    className="bg-[#212121] py-[10px] px-3 rounded-xl outline-none text-sm leading-[23px] border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00]"
                  />
                </div>
                <div className="flex flex-col w-full h-auto gap-1.5">
                  <label
                    htmlFor="passwordL"
                    className="text-white text-sm leading-[16.8px] font-main tracking-wide"
                  >
                    Password *
                  </label>
                  <Input
                    id="passwordL"
                    placeholder="Password"
                    type="password"
                    className="bg-[#212121] py-[10px] px-3 rounded-xl outline-none text-sm leading-[23px] border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00]"
                  />
                </div>
              </div>
              <button className="flex font-main rounded-[1.25rem] w-full h-[40px] bg-[#FCCB00] text-[#522700] font-[600] items-center justify-center hover:bg-[#D4A900] hover:text-[#1C1600] transition-colors duration-[250ms]">
                Sign In
              </button>

              <div className="w-full h-[17px] flex justify-center items-center relative">
                <div className="w-full h-[1px] bg-[#383737]" />
                <span className="font-main absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] bg-[#171717] text-sm leading-[16.8px] font-[500] tracking-wider text-[#858585] w-[45px] flex justify-center items-center">
                  Or
                </span>
              </div>

              <div className="w-full h-auto flex flex-col gap-3">
                <SocialButton type="google" />
                <SocialButton type="facebook" />
              </div>
            </div>

            <div className="w-full h-auto flex gap-1.5 items-center text-base justify-center font-main leading-[19.2px]">
              <span className="font-[300] text-[#D8D8D8]">
                Dont’t have an account?
              </span>
              <button
                onClick={setRegister}
                type="button"
                className="font-[400] text-[#FCCB00]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      ) : type === "register" ? (
        <div className="w-full max-w-[444px] sm:h-full h-auto max-h-[727px] gap-11 p-4 sm:p-8 rounded-3xl bg-[#171717] backdrop-blur-xl border-[1px] border-[#ffffff05] flex flex-col">
          <div className="flex flex-col gap-4 w-full h-auto">
            <button
              onClick={popupClose}
              className="w-[24px] h-[24px] flex items-center justify-center ml-auto opacity-70"
            >
              <img
                src="/close.svg"
                alt="close"
                className="w-[24px] h-[24px] object-contain"
                draggable="false"
              />
            </button>
            <h3 className="font-main text-[32px] leading-[42.2px] font-[500] text-center uppercase tracking-wider">
              Sign Up
            </h3>
          </div>

          <form className="w-full h-auto flex flex-col gap-6 relative">
            <div className="w-full h-auto flex flex-col gap-8">
              <div className="w-full h-auto flex flex-col gap-5">
                <div className="flex flex-col w-full h-auto gap-1.5">
                  <label
                    htmlFor="emailL"
                    className="text-white text-sm leading-[16.8px] font-main tracking-wide"
                  >
                    Email *
                  </label>
                  <Input
                    id="emailL"
                    placeholder="Email"
                    type="email"
                    className="bg-[#212121] py-[10px] px-3 rounded-xl outline-none text-sm leading-[23px] border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00]"
                  />
                </div>
                <div className="flex flex-col w-full h-auto gap-1.5">
                  <label
                    htmlFor="passwordL"
                    className="text-white text-sm leading-[16.8px] font-main tracking-wide"
                  >
                    Password *
                  </label>
                  <Input
                    id="passwordL"
                    placeholder="Password"
                    type="password"
                    className="bg-[#212121] py-[10px] px-3 rounded-xl outline-none text-sm leading-[23px] border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00]"
                  />
                </div>
                <div className="flex flex-col w-full h-auto gap-1.5">
                  <label
                    htmlFor="passwordL"
                    className="text-white text-sm leading-[16.8px] font-main tracking-wide"
                  >
                    Confirm Password *
                  </label>
                  <Input
                    id="passwordL"
                    placeholder="Confirm Password"
                    type="password"
                    className="bg-[#212121] py-[10px] px-3 rounded-xl outline-none text-sm leading-[23px] border-[1px] border-[#ffffff05] transition-colors duration-[250ms] focus:placeholder-[#ffffff00]"
                  />
                </div>
              </div>
              <button className="flex font-main rounded-[1.25rem] w-full h-[40px] bg-[#FCCB00] text-[#522700] font-[600] items-center justify-center hover:bg-[#D4A900] hover:text-[#1C1600] transition-colors duration-[250ms]">
                Sign Up
              </button>

              <div className="w-full h-[17px] flex justify-center items-center relative">
                <div className="w-full h-[1px] bg-[#383737]" />
                <span className="font-main absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] bg-[#171717] text-sm leading-[16.8px] font-[500] tracking-wider text-[#858585] w-[45px] flex justify-center items-center">
                  Or
                </span>
              </div>

              <div className="w-full h-auto flex flex-col gap-3">
                <SocialButton type="google" typeForm="register" />
                <SocialButton type="facebook" typeForm="register" />
              </div>
            </div>

            <div className="w-full h-auto flex gap-1.5 items-center text-base justify-center font-main leading-[19.2px]">
              <span className="font-[300] text-[#D8D8D8]">
                Already have an account?
              </span>
              <button
                onClick={setLogin}
                type="button"
                className="font-[400] text-[#FCCB00]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Auth;
