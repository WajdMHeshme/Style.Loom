import Marquee from "react-fast-marquee";

export interface InfinitScrollProps {
  contentsBar: string[];
}
export default function InfinitScroll({ contentsBar }: InfinitScrollProps) {
  return (
    <Marquee autoFill>
      <div className="flex items-center gap-[12px] 2xl:gap-[16px] py-[30px] sm:py-[40px] 2xl:py-[50px] border-black20 border-t-2 border-dashed">
        {contentsBar.map((content, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-[12px] 2xl:gap-[16px]"
            >
              <span
                key={content}
                className="font-normal text-xl sm:text-2xl 2xl:text-3xl leading-[120%] text-black20"
              >
                {content}
              </span>
              <img
                src="/Clippathgroup.svg"
                alt="footerVector"
                className="w-[40px] sm:w-[50px] 2xl:w-[60px]"
              />
            </div>
          );
        })}
      </div>
    </Marquee>
  );
}
