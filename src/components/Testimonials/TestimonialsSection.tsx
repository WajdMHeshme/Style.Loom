import React, { useState } from "react";
import TestimonialCard from "../Testimonials/TestimonalCard";
import TitleComponent from "../TitleComponent/TitleComponent";

const TestimonialSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <section className="w-full 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
      {/* Title wrapper with dashed border and rounded top corners */}
      <div className="rounded-t-[20px] overflow-hidden border-2 border-dashed border-black15 relative">
        {/* الصورة: مخفية تحت md */}
        <img
          src={"/assets/imgs/Testimonials/Abstract Design.png"}
          alt=""
          aria-hidden="true"
          className="hidden md:block pointer-events-none absolute top-0 right-0 translate-x-[10%] -translate-y-[5%] max-w-[18rem] md:max-w-[22rem]"
        />

        <div>
          <TitleComponent
            desc={"At StyleLoom, our customers are the heartbeat of our brand."}
            title={"The StyleLoom Testimonial Collection."}
          />
        </div>
      </div>

      {/* Cards wrapper with dashed border, no top border, rounded bottom corners */}
      <div className="flex flex-wrap border-t-0 rounded-b-[20px] overflow-hidden border-2 border-dashed border-black15">
        {/* visible testimonials (always shown) */}
        <div className="w-full md:w-1/2 xl:w-1/3">
          <TestimonialCard
            description={
              "StyleLoom exceeded my expectations. The gown's quality and design made me feel like a queen. Fast shipping, too!"
            }
            person={"/assets/imgs/Testimonials/Image-1.png"}
            personCity={"New York, USA"}
            personName={"Sarah Thompson"}
            border={"border1"}
          />
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3">
          <TestimonialCard
            description={
              "Absolutely love the style and warmth of the jacket. A perfect blend of fashion and functionality!"
            }
            person={"/assets/imgs/Testimonials/Image-2.png"}
            personCity={"Mumbai, India"}
            personName={"Rajesh Patel"}
            border={"border2"}
          />
        </div>

        <div className="w-full md:w-1/2 xl:w-1/3">
          <TestimonialCard
            description={
              "Adorable and comfortable! My daughter loves her new outfit. Thank you, StyleLoom, for dressing our little fashionista."
            }
            person={"/assets/imgs/Testimonials/Image-3.png"}
            personCity={"London, UK"}
            personName={"Emily Walker"}
            border={"border3"}
          />
        </div>

        {/* invisible-on-mobile testimonials (hidden on small, shown on md+; on small they appear when isExpanded true) */}
        <div className={`${isExpanded ? "block" : "hidden"} md:block w-full md:w-1/2 xl:w-1/3`}>
          <TestimonialCard
            description={
              "Impressed by the quality and style. These shoes turned heads at every event. StyleLoom, you've gained a loyal customer!"
            }
            person={"/assets/imgs/Testimonials/Image-4.png"}
            personCity={"Barcelona, Spain"}
            personName={"Alejandro Martinez"}
            border={"border4"}
          />
        </div>

        <div className={`${isExpanded ? "block" : "hidden"} md:block w-full md:w-1/2 xl:w-1/3`}>
          <TestimonialCard
            description={
              "Perfect fit and exceptional quality. These jeans have become my go-to for casual and chic outings."
            }
            person={"/assets/imgs/Testimonials/Image-5.png"}
            personCity={"Delhi, India"}
            personName={"Priya Sharma"}
            border={"border5"}
          />
        </div>

        <div className={`${isExpanded ? "block" : "hidden"} md:block w-full md:w-1/2 xl:w-1/3`}>
          <TestimonialCard
            description={
              "Stylish sneakers that don't compromise on comfort. StyleLoom knows how to balance fashion and functionality."
            }
            person={"/assets/imgs/Testimonials/Image-6.png"}
            personCity={"Mexico City, Mexico"}
            personName={"Maria Rodriguez"}
            border={"border6"}
          />
        </div>

        {/* Buttons (only on small screens) */}
        <div className="w-full px-4">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="block md:hidden w-full py-6 text-base text-[var(--gray70-color)] bg-transparent border-t border-dashed"
              style={{ borderColor: "var(--black20-color)" }}
            >
              <div className="flex items-center justify-center gap-3 text-gray70">
                <span>View All</span>
                <img src={"/assets/imgs/Icons/arrow.png"} alt="arrow" className="w-5 h-5 ml-3" />
              </div>
            </button>
          ) : (
            <button
              onClick={() => setIsExpanded(false)}
              className="block md:hidden w-full py-6 text-base text-gray70 bg-transparent border-t border-dashed border-black20"
            >
              <div className="flex items-center justify-center">View Less</div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
