import React from "react";
import Button from "../components/Button";
import { goals } from "../constants";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const PartnerHero = () => {
  return (
    <section className="px-4 md:px-14 w-full bg-white" id="/">
      <div className="md:flex items-center gap-28 pt-24 pb-10">
        <div className="">
          <h1 className="text-[2rem] md:text-[3rem] w-full lg:w-[35rem] text-secondary font-[500]">
            <span className=" text-secondary"> WELCOME <span className="text-primary"> TO </span>MERQRI -</span> Elevate
            your moving Business with Us!
          </h1>
          <p className="w-full lg:w-[35rem] text-secondary text-sm lg:text-[15px] mt-2">
            At MERQRI, we believe in the power of strategic
            partnerships. If you're a moving company seeking growth, efficiency,
            and a competitive edge in the industry, you're in the right place.
            Explore the possibilities of becoming a valued vendor in our
            network.
          </p>
          <div className="mt-24 flex items-center bg-primary text-white font-semibold py-3 px-6 rounded-lg cursor-pointer text-xs md:text-sm gap-2 w-fit">
            <Link href="/partner-application" className={``}>
              Become A Partner
            </Link>
            <GoArrowUpRight size={23} />
          </div>
        </div>
        <div className="">
          <img src="/right.png" alt="bubble" className="hidden lg:block absolute top-[20rem] right-[38rem] w-[50px]"/>
          <img src="/images/Union.png" alt="union" className=" hidden lg:block relative top-[-10px] right-[-110px] w-[600px] " />
        </div>
      </div>
    </section>
  );
};

export default PartnerHero;
