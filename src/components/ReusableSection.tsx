import { MdArrowOutward } from "react-icons/md";



export interface ReusableSectionTwo {
    title: string;
    btn: string;
    children: React.ReactNode;
}

export default function ReusableSectionTwo({title , btn , children} :ReusableSectionTwo ) {
  return (
    <section className="2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]  rounded-[20px]">
      <div className="p-[40px] rounded-t-2xl flex items-center justify-start sm:justify-between flex-wrap flex-col sm:flex-row border-b-0 border-2 border-dashed border-black15">
        <h3 className="font-roboto font-medium text-white text-xl sm:text-2xl 2xl:text-3xl mb-5 sm:b-0">{title}</h3>
        <button className="relative flex items-center justify-center gap-x-1 font-roboto font-normal text-sm 2xl:text-lg text-white border border-dashed border-black15 bg-black12 2xl:px-6 2xl:py-[18px] sm:px-5 sm:py-[14px] py-3.5 rounded-xl w-full sm:w-fit"
            >{btn} <MdArrowOutward />
            <span className="absolute w-[16.5px] h-[16.5px] border-t border-l border-[#AE9B84] rounded-tl-lg -top-0 -left-0" />
            <span className="absolute w-[16.5px] h-[16.5px] border-t border-r border-[#AE9B84] rounded-tr-lg -top-0 -right-0" />
            <span className="absolute w-[16.5px] h-[16.5px] border-b border-l border-[#AE9B84] rounded-bl-lg -bottom-0 -left-0" />
            <span className="absolute w-[16.5px] h-[16.5px] border-b border-r border-[#AE9B84] rounded-br-lg -bottom-0 -right-0" />
        </button>
      </div>
      <div>{children}</div>
    </section>
  )
}