import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full h-auto min-h-[202px] flex items-center justify-center px-[16px] xl:px-[6.25rem]">
      <div className="w-full h-auto min-h-[121px] flex justify-between md:flex-row flex-col md:gap-0 gap-8 md:my-0 my-16 flex-wrap">
        <div className="relative w-auto h-auto flex flex-col gap-4">
          <img
            src="/logo.svg"
            alt=""
            className="w-[60px] h-[40px] object-contain"
          />
          <p className="font-main font-[300] text-sm">2024 © 5Ksana</p>
          <Link to={"/privacy"} className="font-main font-[300] text-sm">
            Privacy policy
          </Link>
        </div>

        <div className="w-auto h-auto flex flex-col gap-3">
          <Link to={"/shop"} className="uppercase font-main font-[500]">
            Shop
          </Link>
          <Link to={"/gallery"} className="uppercase font-main font-[500]">
            Bitcoin art gallery
          </Link>
          <Link to={"/contact"} className="uppercase font-main font-[500]">
            Contact
          </Link>
          <Link to={"/about"} className="uppercase font-main font-[500]">
            About me
          </Link>
        </div>

        <div className="w-auto h-auto flex flex-col gap-4 relative">
          <div className="flex flex-col w-auto h-auto gap-2">
            <h5 className="font-main font-[400]">Contact Information</h5>
            <a
              href={`mailto:info@5ksana.art`}
              className="relative w-auto h-auto flex gap-1 opacity-90"
            >
              <img
                src="/email.svg"
                alt=""
                className="w-[24px] h-[24px] object-contain"
              />
              <span className="font-main font-[300] underline underline-offset-1">
                info@5ksana.art
              </span>
            </a>
          </div>

          <div className="flex flex-col w-auto h-auto gap-2">
            <h5 className="font-main font-[400]">Payments</h5>
            <div className="flex gap-1 w-auto h-auto relative">
                <img src="/Mastercard.svg" alt="" className="w-[40px] h-[27.43px]" />
                <img src="/Visa.svg" alt="" className="w-[40px] h-[27.43px]" />
                <img src="/Bitcoin.svg" alt="" className="w-[40px] h-[27.43px]" />
                <img src="/Amex.svg" alt="" className="w-[40px] h-[27.43px]" />
                <img src="/JCB.svg" alt="" className="w-[40px] h-[27.43px]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
