import React from "react";
import { Link } from "react-router-dom";

interface ButtonComponentProps {
  text: string;
  to?: string; 
  className?: string; 
  onClick?: () => void;
  "aria-label"?: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  to = "#",
  className = "",
  onClick,
  "aria-label": ariaLabel,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label={ariaLabel ?? text}
      className={
        `inline-flex items-center gap-[7.13px] px-[20px] py-[14px] rounded-[8px]
         bg-[var(--black12-color)] text-[var(--white-color)] font-[var(--main-font)]
         text-[14px] leading-[21px] no-underline
         border border-dashed border-[var(--brown60-color)]
         select-none ` + className
      }
    >
      <span>{text}</span>
      <img src={"/assets/imgs/Icons/Icon-8.png"} alt="" className="w-4 h-4 object-contain" />
    </Link>
  );
};

export default ButtonComponent;
