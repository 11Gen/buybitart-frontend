import React from "react";
import TextArea from "./TextArea";

const TextAreaLabel = ({id, label, autocomplete, placeholder}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full h-auto">
      <label htmlFor={id} className={`text-white text-sm font-[300] leading-[16.8px] font-main tracking-wide`}>
        {label}
      </label>
      <TextArea
        className={`w-full h-[194px] resize-none rounded-xl py-[10px] px-3 bg-[#212121] tracking-wide font-main border-[1px] border-[#ffffff05] transition-colors duration-[250ms] placeholder-[#707070] focus:placeholder-[#ffffff00] focus:outline-none font-[300]`}
        autocomplete={autocomplete}
        placeholder={placeholder}
        id={id}
      />
    </div>
  );
};

export default TextAreaLabel;