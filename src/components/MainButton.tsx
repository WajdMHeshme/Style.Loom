import React from "react";

interface ShopButtonProps {
  text?: string;
  iconSrc?: string;
  className?: string;
}

const ShopButton: React.FC<ShopButtonProps> = ({
  text = "Shop Now",
  iconSrc = "/assets/imgs/Icons/Icon-8.png",
  className = "",
}) => {
  return (
    <button
      className={`relative flex items-center justify-center gap-2
        px-4 py-2 sm:px-5 sm:py-3
        rounded-xl
        bg-[#1F1F1F] text-white
        border border-dashed border-[#404040]
        hover:shadow-[0_0_15px_rgba(249,174,45,0.97),0_0_10px_rgba(120,72,18,0.6),0_0_27px_rgba(87,52,12,0.8)]
        transition
        w-fit
        ${className}
      `}
    >
      <span className="flex items-center gap-1 text-sm sm:text-base md:text-lg font-medium">
        {text}
        {iconSrc && (
          <img
            src={iconSrc}
            alt="arrow"
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />
        )}
      </span>

      {/* gold corner spans */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#AE9B84] rounded-tl-[12px]" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#AE9B84] rounded-tr-[12px]" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#AE9B84] rounded-bl-[12px]" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#AE9B84] rounded-br-[12px]" />
    </button>
  );
};

export default ShopButton;
