import { useState, useRef } from "react";
import { exportedFAQCardData } from "../../Data/FAQComponentData";

// Types
interface Btn {
  filter: string;
  txt: string;
}

interface FAQItem {
  title: string;
  desc: string;
}

interface FAQCard {
  filter: string;
  btn: FAQItem[];
}

export default function FAQComponent() {
  const btns: Btn[] = [
    { filter: "All", txt: "All" },
    { filter: "Ordering", txt: "Ordering" },
    { filter: "Shipping", txt: "Shipping" },
    { filter: "Returns", txt: "Returns" },
    { filter: "Support", txt: "Support" },
  ];

  const [activeBtn, setActiveBtn] = useState<string>("All");
  const [isHide, setIsHide] = useState<boolean>(true);

  // ref array to store right-side card elements
  const hideSideRefs = useRef<(HTMLDivElement | null)[]>([]);

  function activeTab(filter: string) {
    setActiveBtn(filter);
  }

  const toggleAll = () => {
    // if any card is hidden or not explicitly block, we'll show all; otherwise hide all
    const anyHidden = hideSideRefs.current.some(
      (ref) => !ref || ref.style.display !== "block"
    );

    hideSideRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.display = anyHidden ? "block" : "none";
      }
    });

    setIsHide(!anyHidden);
  };

  return (
    <div className="w-full 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
      <div className="w-full font-sans">
        {/* wrapper relative عشان الصورة absolute */}
        <div
          className="w-full rounded-t-lg border-2 border-dashed border-black15 relative overflow-hidden
                     md:pr-[18rem] pr-[20px] md:pl-[80px] pl-[20px] pt-[80px] pb-[80px]"
        >
          {/* الصورة كعنصر مستقل: تظهر فقط من md وفوق */}
          <img
            src={"/assets/imgs/Vector.png"}
            alt=""
            aria-hidden="true"
            className="hidden md:block pointer-events-none absolute top-0 right-0
                       translate-x-[10%] -translate-y-[5%] max-w-[18rem] md:max-w-[22rem]"
          />

          <h2 className="text-[28px] md:text-4xl xl:text-5xl text-white uppercase mb-8">
            Have Questions? We Have Answers.
          </h2>
          <p className="text-lg text-gray40 mb-12">
            Ease into the world of StyleLoom with clarity. Our FAQs cover a
            spectrum of topics.
          </p>

          {/* buttons */}
          <div className="flex gap-3 overflow-x-auto whitespace-nowrap">
            {btns.map((btn, index) => (
              <button
                key={index}
                className={`px-6 py-4 h-16 rounded-lg text-base font-medium border border-transparent ${
                  activeBtn === btn.filter
                    ? "bg-brown70 text-black px-8"
                    : "bg-transparent textgray40"
                }`}
                onClick={() => activeTab(btn.filter)}
              >
                {btn.txt}
              </button>
            ))}
          </div>
        </div>

        {/* cards */}
        <div className="flex flex-wrap w-full">
          {exportedFAQCardData.map((e: FAQCard) => {
            if (activeBtn === e.filter) {
              return e.btn.map((b, index) => {
                const refIndex = Math.floor(index / 2);
                if (index % 2 === 0) {
                  return (
                    <div
                      className="p-8 md:p-16 w-full md:w-1/2 border-l-2 border-b-2 border-dashed border-black15"
                      id={`card${index}`}
                      key={`left-${index}`}
                    >
                      <h3 className="text-2xl md:text-3xl text-white mb-4">
                        {b.title}
                      </h3>
                      <p className="text-base text-gray40">{b.desc}</p>
                    </div>
                  );
                } else {
                  return (
                    <div
                      ref={(el) => {
                        // assign without returning a value (void)
                        hideSideRefs.current[refIndex] = el;
                      }}
                      className="p-8 md:p-16 w-full md:w-1/2 border-l-2 border-r-2 border-b-2 border-dashed border-black15"
                      id={`card${index}`}
                      key={`right-${index}`}
                    >
                      <h3 className="text-2xl md:text-3xl text-white mb-4">
                        {b.title}
                      </h3>
                      <p className="text-base text-gray40">{b.desc}</p>
                    </div>
                  );
                }
              });
            }
            return null;
          })}
        </div>

        {/* View all (visible on smaller screens only) */}
        <button
          className="block md:hidden w-full bg-transparent text-gray40 border-0 outline-0 py-8 border-l-2 border-r-2 border-b-2 border-dashed border-black15 rounded-b-lg"
          onClick={toggleAll}
        >
          {isHide ? "View All" : "Hide"}
        </button>
      </div>
    </div>
  );
}
