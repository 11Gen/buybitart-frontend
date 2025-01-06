import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Checkbox from "./Checkbox";
import { createMarkup } from "../utils";
import { pages } from "../utils/data";

const ContactForm = ({ decor }) => {
  const inputCss = `border-0 outline-0 w-full h-[44px] rounded-[20px] py-[10px] px-[12px] bg-[#212121] font-main font-[300] text-base placeholder-[#707070]`;
  const textareaCss = `border-0 outline-0 w-full h-full flex-1 flex rounded-[20px] py-[10px] px-[12px] resize-none bg-[#212121] font-main font-[300] text-base placeholder-[#707070]`;
  //    min-h-[284px]
  return (
    <div className={`w-full h-auto min-h-[464px] ${decor ? 'my-14 md:my-0' : 'my-5 md:my-0'} relative flex justify-center items-center px-[16px] xl:px-[6.25rem]`}>
      <div className="w-full z-[1] h-auto rounded-[20px] p-4 sm:p-8 bg-[#FFFFFF1A] border-[1px] border-[#212121] backdrop-blur-xl xl:flex-row flex-col flex justify-between">
        <div className="flex flex-col gap-6 sm:gap-[40px] w-full h-auto xl:mb-0 mb-8">
          <div className="flex flex-col gap-4 w-full xl:w-fit h-auto relative">
            <h4 dangerouslySetInnerHTML={createMarkup(pages.elements.sections[0].title)} className="font-main uppercase 2xl:text-5xl text-4xl font-[600] w-max tracking-wider" />
            <p className="font-main font-[300] opacity-50 xl:max-w-[450px] w-auto text-lg sm:text-xl sm:tracking-wide">
              {pages.elements.sections[0].description}
            </p>
          </div>
          <a
            href={`mailto:info@5ksana.art`}
            className="relative w-auto h-auto flex gap-1"
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

        <form className="flex flex-col gap-6 relative w-full 2xl:max-w-[750px] xl:max-w-[588px] h-auto">
          <div className="flex flex-col gap-6 relative w-full h-auto">
            <div className="flex xl:flex-row flex-col w-full justify-between gap-6 h-auto">
              <div className="flex flex-col gap-6 w-full h-auto">
                <Input type="text" placeholder="Name" className={inputCss} />
                <Input type="email" placeholder="Email" className={inputCss} />
              </div>
              <div className="w-full h-full flex relative">
                <TextArea placeholder="Message" className={textareaCss} />
              </div>
            </div>

            <label
              htmlFor="checkPrivacy"
              className="w-auto h-auto relative flex items-center gap-2"
            >
              <Checkbox />
              <span className="font-main font-[300] sm:text-base text-sm">
                I have read and agree with the privacy policy
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="ml-auto w-full sm:w-[108px] h-[40px] rounded-[20px] py-[10px] px-3 gap-3 flex items-center justify-center bg-[#FCCB00] text-[#522700] font-main font-[600] hover:bg-white hover:text-black transition-colors duration-[250ms]"
          >
            Send{" "}
            <img
              src="/send.svg"
              alt=""
              className="w-[32px] h-[32px] object-contain"
            />
          </button>
        </form>
      </div>

      {decor && (
        <>
          <img
            src="/btc1.png"
            alt=""
            className="absolute -top-7 xl:top-10 right-[16px] sm:right-5 xl:right-10 w-[80px] xl:w-[120px] h-[80px] xl:h-[120px] object-contain z-[2] pointer-events-none"
          />
          <img
            src="/btc2.png"
            alt=""
            className="absolute -bottom-20 sm:-bottom-7 xl:bottom-10 left-[16px] sm:left-5 xl:left-10 w-[80px] xl:w-[120px] h-[80px] xl:h-[120px] object-contain z-[2] pointer-events-none"
          />

          <div className="w-[405px] xl:w-[505px] h-[300px] xl:h-[400px] absolute bottom-[-150px] right-[-300px] bg-[#FCCB002E] rounded-full blur-[150px] rotate-[22deg] pointer-events-none"></div>
          <div className="w-[300px] xl:w-[400px] h-[300px] xl:h-[400px] absolute top-[-156px] left-[-183px] bg-[#FCCB002E] rounded-full blur-[150px] rotate-[22deg] pointer-events-none"></div>
        </>
      )}
    </div>
  );
};

export default ContactForm;
