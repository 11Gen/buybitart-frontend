import React from "react";
import { useSearchParams } from "react-router-dom";

const AdminAddItems = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.toString().replace('=', '');

  return (
    <div className="w-[100vw] h-full">
      <div className="w-full h-full relative mt-[calc(52px+40px)] xl:mt-[calc(65px+40px)] px-[16px] xl:px-[6.25rem] pb-14">sdfs</div>
    </div>
  );
};

export default AdminAddItems;
