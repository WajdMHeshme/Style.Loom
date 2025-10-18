import { stepsData } from "../../../Data/stepsData";
import TitleComponent from "../../shared/TitleComponent/TitleComponent";
// import { stepsData } from "./../../Data/stepsData";

function StepsComponent() {
    return (
        <div className=" 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
            <div className="relative flex flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#262626] bg-black06 overflow-hidden">
                {/* Title */}
                <div className="w-full">
                    <TitleComponent
                        title="Navigating the StyleLoom Fashion Journey."
                        desc="At StyleLoom, we've designed a straightforward shopping experience to make fashion accessible."
                        img={"/assets/imgs/Vector.png"}
                        fullImage={true}
                    />
                </div>

                {/* Steps */}
                <div
                    className="
          grid w-full border-t border-dashed border-[#262626] 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {stepsData.map((data, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start justify-center px-6 py-8 border-b border-r border-dashed border-black15 
                last:border-r-0 lg:border-b-0
                sm:even:border-r-0 sm:last:border-b-0
                max-sm:w-full"
                        >
                            <span className="mb-5 font-[400] text-[20px] leading-[30px] font-second text-gray40 sm:text-[18px] sm:leading-[27px] xs:text-[16px] xs:leading-[24px]">
                                {data.stepCount}
                            </span>
                            <h4 className="mb-4 font-main text-[28px] font-[500] leading-[42px] text-white sm:text-[22px] sm:leading-[33px] xs:text-[20px] xs:leading-[30px]">
                                {data.title}
                            </h4>
                            <p className="font-main text-[18px] font-[400] leading-[27px] text-gray40 sm:text-[16px] sm:leading-[24px] xs:text-[14px] xs:leading-[21px]">
                                {data.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StepsComponent;
