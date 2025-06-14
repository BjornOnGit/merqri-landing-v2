/* eslint-disable react/prop-types */

import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const Button = ({
  href,
  text,
  className = "",
  icon: Icon = GoArrowUpRight,
  bgColor = "bg-primary",
  ...props
}) => {
  return (
    <button
      className={`${bgColor} text-white font-bold py-2 rounded-lg px-4 mt-4 md:mt-8 ${className}`}
      {...props}
    >
      <Link href={href} className="flex items-center gap-1">
        {text} {Icon && <Icon size={20} />}
      </Link>
    </button>
  );
};

export default Button;
