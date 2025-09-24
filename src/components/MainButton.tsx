import React from "react"

interface ShopButtonProps {
  text?: string
  iconSrc?: string
}

const ShopButton: React.FC<ShopButtonProps> = ({
  text = "Shop Now",
  iconSrc = "/assets/imgs/Icons/Icon-8.png",
}) => {
  return (
    <button
      className="
        relative bottom-[-18px] sm:bottom-[-32px] left-1/2 -translate-x-1/2
        flex items-center justify-center gap-1
        md:w-[128px] lg:w-[159px] lg:h-[63px] md:h-[48px]
        h-8
        rounded-[12px]
        border border-dashed border-[#404040]
        lg:px-[24px] p-3 lg:py-[18px]
        bg-[#1F1F1F] text-white
        transition
        hover:shadow-[0_0_15px_rgba(249,174,45,0.97),0_0_10px_rgba(120,72,18,0.6),0_0_27px_rgba(87,52,12,0.8)]
      "
    >
      <span className="flex items-center text-[12px] lg:text-lg gap-1 font-medium">
        {text}
        <span className="hidden sm:block">
          <img src={iconSrc} alt="arrow" className="w-4 h-4 inline-block" />
        </span>
      </span>

      {/* الحواف الذهبية */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#AE9B84] rounded-tl-[12px]" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#AE9B84] rounded-tr-[12px]" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#AE9B84] rounded-bl-[12px]" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#AE9B84] rounded-br-[12px]" />
    </button>
  )
}

export default ShopButton
