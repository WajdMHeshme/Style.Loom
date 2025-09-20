import type { FC } from "react";

const InfoSection: FC = () => {
  return (
    <section className="w-full pt-[200px]">
      <div className="2xl:px-[168px] md:px-[30px] px-4 mb-[100.5px]">
        {/* main card */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[20px]
            p-[60px] md:p-[100px]
            bg-brown70
            flex
            flex-col md:flex-row
            items-start md:items-center
            gap-6 md:gap-8
            h-auto md:h-[436px]
          "
        >
          <img
            src={"/assets/imgs/Ad/Vector.webp"}
            alt=""
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              top-1/2
              right-0
              -translate-y-1/2
              h-[320px]
              md:h-[480px]
              max-w-[340px]
              md:right-[-6rem]
              md:max-w-[436px]
              opacity-90
              select-none
              z-0
            "
          />

          {/* content column above the image */}
          <div className="relative z-10 w-full md:w-auto md:max-w-[65%]">
            <h2 className="text-[28px] md:text-[38px] lg:text-[58px] leading-[1.05] md:leading-[69.6px] font-medium uppercase text-[#0b0b0b]">
              Elevate your wardrobe
            </h2>

            <p className="mt-3 text-[14px] md:text-[16px] text-black/70 max-w-full md:max-w-[60%]">
              Don't miss out – experience the epitome of fashion by clicking{" "}
              <span className="font-semibold">'Buy Now'</span> and embrace a world of
              chic elegance delivered to your doorstep. Your style journey begins
              here.
            </p>
          </div>

          {/* Button:
              - on small screens: full-width under text (in flow)
              - on md+          : positioned to the right inside the card (absolute)
          */}
          <div className="relative z-10 w-full md:w-auto md:absolute md:right-[6rem] md:top-1/2 md:-translate-y-1/2 mt-6 md:mt-0">
            <button
              type="button"
              className="
                w-full md:w-auto
                inline-flex items-center gap-2 justify-center
                bg-[#0b0b0b] text-white
                text-sm font-medium
                px-4 py-3 md:px-4 md:py-2 rounded-md
                shadow-sm
              "
            >
              <span>Shop Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
