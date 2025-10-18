// src/components/ReusableSectionTwo.tsx
import React from "react";
import ShopButton from "./MainButton";


export interface ReusableSectionTwoProps {
  title: string;
  btn: string;
  children: React.ReactNode;
}

export default function ReusableSectionTwo({
  title,
  btn,
  children,
}: ReusableSectionTwoProps) {
  return (
    <section className="2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]  rounded-[20px]">
      <div className="p-[40px] rounded-t-2xl flex items-center justify-start sm:justify-between flex-wrap flex-col sm:flex-row border-b-0 border-2 border-dashed border-black15">
        <h3 className="font-roboto font-medium text-white text-xl sm:text-2xl 2xl:text-3xl mb-5 sm:mb-0">
          {title}
        </h3>
        <ShopButton
          text={btn}
          className="relative flex items-center justify-center gap-x-1 font-roboto font-normal text-sm 2xl:text-lg text-white border border-dashed border-black15 bg-black12 px-5 py-3.5 rounded-xl w-full sm:w-fit"
        />
      </div>

      <div>{children}</div>
    </section>
  );
}
