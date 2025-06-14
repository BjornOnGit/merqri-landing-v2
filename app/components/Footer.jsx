/* eslint-disable react/prop-types */

import {
  footerDetails1,
  footerDetails2,
  footerLinks,
} from "../constants/index";

const FooterLink = ({ link, size }) => (
  <a
    key={link.name}
    href={link.link}
    className="text-white text-base cursor-pointer"
    aria-label={link.name}
  >
    <link.icon size={size} />
  </a>
);

const FooterDetails = ({ details, textSize, linkSize }) => (
  <div>
    <p className={`text-white ${textSize} mb-2`}>{details.title}</p>
    <ul>
      {details.links.map((link) => (
        <li
          key={link.name}
          className={`text-[#AE7D4B] ${linkSize} font-[500] cursor-pointer`}
        >
          {link.name}
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer className="bg-secondary  px-6 md:px-20 py-10 flex flex-col gap-16">
    <div className="hidden md:block">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <img
            src="/images/logowhite.png"
            alt="Merqri Logo"
            className="w-[12rem]"
          />
          <div className="flex items-center gap-5">
            {footerLinks.map((link) => (
              <FooterLink key={link.name} link={link} size={25} />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-20">
          <div className="flex flex-col gap-2">
            {footerDetails1.map((details) => (
              <FooterDetails
                key={details.title}
                details={details}
                textSize="text-lg"
                linkSize="text-base"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {footerDetails2.map((details) => (
              <FooterDetails
                key={details.title}
                details={details}
                textSize="text-lg"
                linkSize="text-base"
              />
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="md:hidden">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <img
            src="/images/logowhite.png"
            alt="Merqri Logo"
            className="w-[10rem]"
          />
          <div className="flex items-center gap-5">
            {footerLinks.map((link) => (
              <FooterLink key={link.name} link={link} size={20} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {footerDetails1.map((details) => (
            <FooterDetails
              key={details.title}
              details={details}
              textSize="text-lg"
              linkSize="text-sm"
            />
          ))}
          {footerDetails2.map((details) => (
            <FooterDetails
              key={details.title}
              details={details}
              textSize="text-lg"
              linkSize="text-sm"
            />
          ))}
        </div>
      </div>
    </div>

    <div className="border-t border-gray-700  pt-4">
      <p className="text-sm text-white text-center md:text-xl">
        &copy; {new Date().getFullYear()} All rights reserved. Merqri, Inc.
      </p>
    </div>
  </footer>
);

export default Footer;
