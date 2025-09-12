import React from "react";

interface TrendsCardProps {
    data: {
        title: string;
        desc: string;
        icon: string;
        iconSm: string;
        bg: string;
    };
    index: number;
    total: number;
}

export default function TrendsCardComponent({ data, index, total }: TrendsCardProps) {
    // Determine border-right removal based on index (like nth-child in CSS)
    let borderRightClass = "border-r-2 border-dashed border-black15";
    if ((index + 1) % 3 === 0 && window.innerWidth >= 1200) borderRightClass = "border-r-0";
    if ((index + 1) % 2 === 0 && window.innerWidth < 1200 && window.innerWidth >= 768) borderRightClass = "border-r-0";
    if (window.innerWidth < 768) borderRightClass = "border-r-0";

    return (
        <div
            className={`relative flex flex-col border-t-2 border-dashed border-black15 ${borderRightClass} p-[60px] sm:p-[50px] md:p-7
        flex-1 basis-[33.33%] sm:basis-1/2 md:basis-full
      `}
        >
            <img
                src={data.bg}
                alt="bg"
                className="absolute top-0 right-0 w-[186px] h-[186px] sm:w-[150px] sm:h-[150px] md:w-[100px] md:h-[100px]"
            />
            <picture>
                <source media="(max-width:1919px)" srcSet={data.iconSm} />
                <img src={data.icon} alt="icon" className="pb-[50px] sm:pb-[40px] md:pb-[40px]" />
            </picture>
            <h4 className="text-white text-[24px] sm:text-[22px] pb-4 sm:pb-3 m-0 font-sans">
                {data.title}
            </h4>
            <p className="text-gray50 text-[18px] sm:text-[16px] m-0 leading-6 font-sans">
                {data.desc}
            </p>
        </div>
    );
}
