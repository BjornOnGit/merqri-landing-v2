import React from "react";

const WaitlistWhyChooseUsBox = ({ title, content1, content2 }) => {
  return (
    <div className=" bg-white rounded-xl p-4">
      <h1 className="text-secondary text-base font-[500]">{title}</h1>
      <div className="text-secondary text-sm flex flex-col gap-8">
        <p>{content1}</p>
        <p>{content2}</p>
      </div>
    </div>
  );
};

export default WaitlistWhyChooseUsBox;
