import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { hash } = useParams();
  return (
    <>
      <div className="w-[100vw] h-full overflow-x-hidden">
        <div className="w-full h-full relative mt-[52px] xl:mt-[65px] px-[16px] xl:px-[6.25rem]">
          {hash}
        </div>
      </div>
    </>
  );
};

export default Product;
