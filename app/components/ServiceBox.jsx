import React from "react";
import Button from "./Button";

const ServiceBox = ({ title, imgUrl, content }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <img src={imgUrl} alt="image" className="" />
      <p className="text-white text-center text-lg">{title}</p>
      <p className=" text-[#BEBECE] text-center text-[16px] w-[100%] md:w-full">{content}</p>
      <div>
      </div>
    </div>
  );
};

export default ServiceBox;
