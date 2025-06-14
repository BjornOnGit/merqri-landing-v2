"use client"

import { useState } from "react";
import { navLinks } from "../constants";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 w-full z-50">
        <div className="hidden sm:block">
          <div className="flex py-6 items-center justify-between navbar mx-20">
            <Link href="/">
              <img src="/images/logo.png" alt="logo" className="h-8" />
            </Link>
            <div className="flex items-center">
              <ul className="flex gap-6">
                <Link href="/" className="text-gray-600 font-semibold">
                  Home
                </Link>
                {navLinks.map((link, index) => (
                  <li key={index} className="-ml-3">
                    <ScrollLink
                      to={link.id}
                      smooth={true}
                      duration={500}
                      className="text-xs md:text-[15px] font-semibold text-gray-600 hover:text-black cursor-pointer"
                    >
                      {link.title}
                    </ScrollLink>
                  </li>
                ))}
                <Link href="/partnership" className="text-gray-600 font-semibold">
                  Partners
                </Link>
              </ul>
            </div>
            <Link
              href="/booking"
              className="ml-4 bg-primary text-white font-semibold py-2 px-4 rounded-lg cursor-pointer text-xs md:text-sm"
            >
              Book Your Move
            </Link>
          </div>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden bg-white shadow-md p-4 w-full flex items-center justify-between relative">
          <Link href="/">
            <img src="/images/logo.png" alt="Merqri Logo" className="h-8" />
          </Link>
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <IoClose size={28} className="text-gray-600" />
            ) : (
              <IoMenu size={28} className="text-gray-600" />
            )}
          </button>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-white bg-opacity-90 shadow-lg mt-1 p-3 z-50"
            >
              <ul className="flex flex-col text-left gap-4">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <ScrollLink
                      to={link.id}
                      smooth={true}
                      duration={500}
                      className="font-semibold hover:text-black cursor-pointer text-gray-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.title}
                    </ScrollLink>
                  </li>
                ))}
                <li>
                  <Link
                    href="/partnership"
                    className="font-semibold hover:text-black cursor-pointer text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Partners
                  </Link>
                </li>
                <li>
                  <Link
                  href="/booking"
                    className="font-semibold hover:text-black cursor-pointer text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Your Move
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </nav>
    </>

  );
};

export default Navbar;
