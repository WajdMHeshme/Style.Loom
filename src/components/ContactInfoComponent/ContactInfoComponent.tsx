import React from "react";
import TitleComponent from "../shared/TitleComponent/TitleComponent";
import { ContactInfoData } from "../../Data/ContactInfoData";
import TrendsCardComponent from "../HomeComponents/TrendsSectionComponent/TrendsCardComponent";
// import TrendsCardComponent from "../../components/TrendsSectionComponent/TrendsCardComponent";

const ContactInfoComponent: React.FC = () => {
  return (
    <section className="w-full 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px] border-2 border-dashed">
      {/* Title Section */}
      <div className="border-2 border-dashed border-black15 rounded-t-[20px] md:rounded-t-[16px] sm:rounded-t-[14px] relative">
        <TitleComponent
          title="Your Partner in Every Step of Your Fashion Journey."
          desc="24/7 Assistance for Seamless Shopping and Unmatched Customer Satisfaction"
          img={"/assets/imgs/Vector2.webp"}
          fullImage={true}
          // hideImageBelowMd={true} // <- هذا السطر يخفي الصورة تحت 768px
        />
      </div>

      {/* Contact Info Heading */}
      <h2 className="text-white font-medium text-[30px] leading-[35.16px] uppercase py-[50px] px-[50px] border-l-2 border-r-2 border-dashed border-black15 mb-0 md:text-[24px] md:leading-[28.13px] md:py-[40px] hidden sm:block">
        contact information
      </h2>

      {/* Contact Cards */}
      <div className="flex border-2 border-dashed border-black15 border-t-0 rounded-b-[20px] overflow-hidden md:rounded-b-[16px] sm:rounded-b-[14px] flex-wrap sm:justify-center">
        {ContactInfoData.map((item, index: number) => (
          <div key={index} className="text-center flex-1 min-w-[200px]">
            <TrendsCardComponent
              data={item}
              index={index}
              className="flex justify-center"
              total={ContactInfoData.length}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfoComponent;
