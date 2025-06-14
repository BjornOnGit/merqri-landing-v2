"use client"

import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdVpnKey } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";

const HeroSection = () => {
  const imageLeft = "/Vector.png";
  const imageRight = "/right.png";
  return (
    <div className="flex flex-col items-center justify-center" >
      <div className="container mx-auto px-4 pt-28 pb-16 text-center font-lato">
        <img
          src={imageLeft}
          className="absolute left-0 top-32 h-4/6 opacity-60 hidden md:block"
          alt="Left Image "
        />
        <img
          src={imageRight}
          className="absolute right-40 top-80 h-16 opacity-60 hidden md:block"
          alt="Right Image"
        />
        <h1 className="text-2xl md:text-4xl font-bold text-secondary mb-4">
          Seamless <span className="text-primary">Relocation</span> Awaits!
        </h1>
        <p className="text-sm text-secondary text-center md:text-xl ">
          Your smooth move starts here. Unlock the best moving experience <br />
          with our curated list of top-notch moving companies. Let&apos;s <br />
          make your relocation stress-free and efficient!
        </p>
        <button className="bg-primary hover:bg-secondary text-white font-bold py-2 rounded-lg px-4 mt-8">
          <Link href="/booking" className="flex items-center gap-1">
            Book Your Move <GoArrowUpRight size={20} />
          </Link>
        </button>
      </div>

      <div className="flex flex-row gap-2 md:gap-14 items-center text-secondary text-xs md:text-sm font-lato mb-0 md:mb-8">
        <div className="flex items-center">
          <div className="rounded-full bg-secondary text-white flex items-center justify-center w-6 h-6">
            <MdVpnKey className="text-sm" />
          </div>
          <p className="ml-2">Comprehensive Management</p>
        </div>
        <div className="flex items-center">
          <div className="rounded-full bg-secondary text-white flex items-center justify-center w-6 h-6">
            <AiFillSafetyCertificate className="text-sm" />
          </div>
          <p className="ml-2">Safety</p>
        </div>
        <div className="flex items-center">
          <div className="rounded-full bg-secondary text-white flex items-center justify-center w-6 h-6">
            <FaMoneyBills className="text-sm" />
          </div>
          <p className="ml-2">Reasonable Price</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
