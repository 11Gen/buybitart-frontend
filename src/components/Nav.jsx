import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full xl:h-[65px] h-[52px] fixed inset-0 px-[16px] xl:px-[6.25rem] py-[0.781rem] flex justify-between z-[1000] border-b-[1px] border-[#fff] webkitBgBlurIos16">
      <div className="logo w-auto h-full relative">
        <Link to={"/"}>
          <img
            src="/logo.svg"
            alt=""
            className="h-[28px] w-auto xl:h-full"
            draggable={false}
          />
        </Link>
      </div>
      <div className="w-auto flex h-full items-center gap-[3.75rem]">
        <div className="xl:flex h-auto w-auto items-center gap-6 font-slab uppercase font-[500] hidden">
          <Link
            to={"/shop"}
            className="p-[0.625rem] hover:opacity-75 transition-opacity duration-[250ms]"
          >
            Shop
          </Link>
          <Link
            to={"/gallery"}
            className="p-[0.625rem] hover:opacity-75 transition-opacity duration-[250ms]"
          >
            Bitcoin art gallery
          </Link>
          <Link
            to={"/contact"}
            className="p-[0.625rem] hover:opacity-75 transition-opacity duration-[250ms]"
          >
            Contact
          </Link>
          <Link
            to={"/about"}
            className="p-[0.625rem] hover:opacity-75 transition-opacity duration-[250ms]"
          >
            About me
          </Link>
        </div>

        <button className="hidden xl:flex font-slab rounded-[1.25rem] w-[107px] h-[40px] bg-[#FCCB00] text-[#522700] font-[600] items-center justify-center hover:bg-white hover:text-black transition-colors duration-[250ms]">
          Login
        </button>

        <div className="flex w-auto h-[24px] items-center gap-4">
          <button className="w-auto h-auto relative bg-[#fff0] py-1 xl:px-2 px-1 rounded-full group hover:bg-[#fff] transition-colors duration-[250ms]">
            <svg
              className="xl:w-[24px] relative top-[-1px] xl:h-[24px] w-[28px] h-[28px] group-hover:invert transition duration-[250ms]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.927 17.54L20.4001 20.9M19.2801 11.94C19.2801 16.2699 15.77 19.78 11.4401 19.78C7.11019 19.78 3.6001 16.2699 3.6001 11.94C3.6001 7.61006 7.11019 4.09998 11.4401 4.09998C15.77 4.09998 19.2801 7.61006 19.2801 11.94Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="w-auto h-auto relative bg-[#fff0] py-1 xl:px-2 px-1 rounded-full group hover:bg-[#fff] transition-colors duration-[250ms] flex justify-center items-center">
            <svg
              className="xl:w-[24px] relative top-[-1px] xl:h-[24px] w-[28px] h-[28px] group-hover:invert transition duration-[250ms]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5999 8.84203C15.5999 10.8303 13.9881 12.442 11.9999 12.442C10.0117 12.442 8.3999 10.8303 8.3999 8.84203M4.72717 21.442H19.2726C20.5579 21.442 21.5999 20.4194 21.5999 19.158L20.109 5.842C20.109 4.58057 19.067 3.55798 17.7817 3.55798H5.92717C4.64186 3.55798 3.5999 4.58057 3.5999 5.842L2.3999 19.158C2.3999 20.4194 3.44186 21.442 4.72717 21.442Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="w-auto h-auto relative bg-[#fff0] py-1 xl:px-2 px-1 rounded-full group hover:bg-[#fff] transition-colors duration-[250ms] justify-center items-center xl:hidden flex">
            <div className="xl:w-[24px] w-[28px] xl:h-[24px] h-[28px] relative flex flex-col justify-center items-center gap-1.5">
              <div className="w-full h-[1.5px] relative bg-white" />
              <div className="w-full h-[1.5px] relative bg-white" />
              <div className="w-full h-[1.5px] relative bg-white" />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
