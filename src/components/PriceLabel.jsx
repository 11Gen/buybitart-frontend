import React from "react";
import { Link } from "react-router-dom";

const PriceLabel = ({ IsCardHash, price, difColor, auction }) => {
  if (IsCardHash)
    return (
      <Link
        to={auction ? `/auction/${IsCardHash}` : `/shop/${IsCardHash}`}
        className={`flex w-max h-[32px] rounded-[20px] p-1 pr-2.5 gap-[8px] items-center z-[1] relative ${
          difColor ? "" : "bg-[#2c2c2e]"
        }`}
        style={difColor ? { backgroundColor: difColor } : null}
      >
        <img
          src={"/btcIcon.png"}
          alt="icon Btc"
          className="w-[24px] h-[24px]"
        />
        <span className="font-main font-[400]">{price}</span>
      </Link>
    );
  else
    return (
      <div
        className={`flex w-max h-[32px] rounded-[20px] p-1 pr-2.5 gap-[8px] items-center z-[1] relative ${
          difColor ? "" : "bg-[#2c2c2e]"
        }`}
        style={difColor ? { backgroundColor: difColor } : null}
      >
        <img
          src={"/btcIcon.png"}
          alt="icon Btc"
          className="w-[24px] h-[24px]"
        />
        <span className="font-main font-[400]">{price}</span>
      </div>
    );
};

export default PriceLabel;
