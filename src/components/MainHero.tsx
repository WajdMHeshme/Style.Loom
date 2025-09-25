import { useEffect, useRef, useState } from "react";
import { tabData } from "../Data/HeroCompData";
import CountUp from "react-countup";

// تعريف نوع البيانات القادمة من tabData
interface TabContent {
  num: number[];
  desc: string[];
  title: string;
  descTab: string;
  backgroundClass: string;
}

// تحديد نوع tabData بشكل عام
type TabDataType = { [key: string]: TabContent };

export default function HeroComponent() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [counterOn, setCounterOn] = useState<boolean>(false);

  // تعريف tabData بأنه من النوع TabDataType
  const { num, desc, title, descTab } = (tabData as unknown as TabDataType)[activeTab];

  // مراقبة القسم الأيمن بالـ IntersectionObserver
  const counterRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCounterOn(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
      <div className="rounded-[20px] overflow-hidden border-dashed border-2 border-[#262626]">
        {/* الصورة */}
        <div className="relative">
         <img 
  src={"/assets/imgs/Hero/img-13.webp"} 
  alt="img" 
  className="
    w-full 
    h-[250px]        /* mobile */
    md:h-[442px]     /* laptop */
    lg:h-[624px]     /* desktop */
    object-cover
  " 
/>


{/* زر Shop Now */}
<button
  className="
    absolute bottom-[-18px] sm:bottom-[-32px] left-1/2 -translate-x-1/2
    flex items-center justify-center gap-1
    md:w-[128px] lg:w-[159px] lg:h-[63px] md:h-[48px]
    h-8
    rounded-[12px]
    border border-dashed border-black15
    lg:px-[24px] p-3 lg:py-[18px]
    bg-[#1F1F1F] text-white
    transition
    hover:shadow-[0_0_15px_rgba(249,174,45,0.97),0_0_10px_rgba(120,72,18,0.6),0_0_27px_rgba(87,52,12,0.8)]
  "
>
  <span className="flex items-center text-[12px] lg:text-lg gap-1 font-medium">
    Shop Now
    <span className="hidden sm:block">
      <img src={"/assets/imgs/Icons/Icon-8.png"} alt="arrow" className="w-4 h-4 inline-block" />
    </span>
  </span>

  {/* الحواف الذهبية */}
  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#AE9B84] rounded-tl-[12px]" />
  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#AE9B84] rounded-tr-[12px]" />
  <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#AE9B84] rounded-bl-[12px]" />
  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#AE9B84] rounded-br-[12px]" />
</button>







        </div>

        {/* الجزء السفلي */}
        <div className="flex flex-col lg:flex-row">
          {/* القسم الأيسر */}
          <div className="w-full lg:w-1/2 px-5 md:px-20 py-14 lg:py-[100px] lg:px-[80px] text-center lg:text-left">
            {/* Tabs */}
<ul className="flex flex-wrap justify-around md:justify-start gap-3">
  {Object.keys(tabData).map((tab) => (
    <li key={tab}>
      <div
        className={`
          inline-flex items-center justify-center
          rounded-xl px-6 py-3 cursor-pointer font-mono transition
          border border-dashed border-black20   /* البوردر */
          text-[#B3B3B2]                        /* لون النص */
          hover:bg-brown60 hover:text-white
          ${activeTab === tab ? "bg-brown60 text-white" : ""}
        `}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </div>
    </li>
  ))}
</ul>


            <h2 className="mt-6 mb-4 text-2xl md:text-4xl lg:text-[38px] 2xl:text-[48px] uppercase  text-white">
              {title}
            </h2>
            <p className="max-w-xl text-sm md:text-base lg:text-lg text-gray40">{descTab}</p>
          </div>

          {/* القسم الأيمن (العدادات) */}
          <div
            ref={counterRef}
            className="w-full lg:w-1/2 flex flex-col border-dashed border-l border-black20"
            style={{
              borderImage:
                "repeating-linear-gradient(to bottom, #262626 0 16px, transparent 16px 22px) 1",
            }}
          >
            <div className="flex flex-col">
              {/* Row1 */}
              <div className="flex border-b border-black20" style={{ borderImage: "repeating-linear-gradient(to right, #262626 0 16px, transparent 16px 22px) 1", borderStyle: "dashed" }}>
                <div className="w-1/2 p-8 lg:p-[50px] text-start">
                  <span className="block text-2xl md:text-4xl lg:text-[50px] font-medium text-white leading-tight">
                    {counterOn ? (
                      <CountUp start={0} end={num[0]} duration={3} delay={0.3} separator="," />
                    ) : (
                      num[0]
                    )}{" "}
                    +
                  </span>
                  <p className="text-gray40 text-sm md:text-base">{desc[0]}</p>
                </div>
                <div
                  className="w-1/2 p-8 lg:p-[50px] text-start border-l border-black20 border-dashed"
                  style={{
                    borderImage:
                      "repeating-linear-gradient(to bottom, #262626 0 16px, transparent 16px 22px) 1",
                  }}
                >
                  <span className="block text-2xl md:text-4xl lg:text-[50px] font-roboto font-medium text-white leading-tight">
                    {counterOn ? (
                      <CountUp start={0} end={num[1]} duration={3} delay={0.3} separator="," />
                    ) : (
                      num[1]
                    )}{" "}
                    +
                  </span>
                  <p className="text-gray40 text-sm md:text-base">{desc[1]}</p>
                </div>
              </div>

              {/* Row2 */}
              <div className="flex">
                <div
                  className="w-1/2 p-8 lg:p-[50px] text-start border-dashed border-r border-black20"
                  style={{
                    borderImage:
                      "repeating-linear-gradient(to bottom, #262626 0 16px, transparent 16px 22px) 1",
                  }}
                >
                  <span className="block text-2xl md:text-4xl lg:text-[50px] font-medium text-white leading-tight">
                    {counterOn ? (
                      <CountUp start={0} end={num[2]} duration={3} delay={0.3} suffix="%" />
                    ) : (
                      num[2]
                    )}
                  </span>
                  <p className="text-gray40 text-sm md:text-base">{desc[2]}</p>
                </div>
                <div className="w-1/2 p-8 lg:p-[50px] text-start">
                  <span className="block text-2xl md:text-4xl lg:text-[50px]  font-medium text-white leading-tight">
                    {counterOn ? (
                      <CountUp start={0} end={num[3]} duration={3} delay={0.3} suffix="%" />
                    ) : (
                      num[3]
                    )}
                  </span>
                  <p className="text-gray40 text-sm md:text-base">{desc[3]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
