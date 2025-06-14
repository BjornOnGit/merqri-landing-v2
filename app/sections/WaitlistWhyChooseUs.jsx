import { waitlistWhyChooseUs } from "../constants/index";
import React from "react";
import WaitlistWhyChooseUsBox from "./WaitlistWhyChooseUsBox";

const WaitlistWhyChooseUs = () => {
  return (
    <section className=" bg-secondary px-5 md:px-10 py-20 ">
      <h1 className=" text-primary text-[2rem] font-[500] mb-10">Why Choose Us</h1>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {waitlistWhyChooseUs.map((item, index) => (
          <WaitlistWhyChooseUsBox
            key={index}
            title={item.title}
            content1={item.content1}
            content2={item.content2}
          />
        ))}
      </div>
      <img src="/images/waitlist.png" alt="" className="mt-10 rounded-xl"/>
    </section>
  );
};

export default WaitlistWhyChooseUs;
