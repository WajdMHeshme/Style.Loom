interface TitleComponentProps {
  title: string;
  desc: string;
  img?: string;
  fullImage?: boolean;
}

export default function TitleComponent({
  title,
  desc,
  img,
  fullImage = false,
}: TitleComponentProps) {
  return (
    <div
      className={`relative text-white max-w-full ${
        fullImage ? "overflow-hidden" : ""
      } pt-[50px] pr-0 px-[40px] sm:pt-[40px] sm:pl-[40px] lg:pt-[30px] lg:pl-[30px] md:pt-[25px] md:pl-[25px] xs:pt-[20px] xs:px-[16px]`}
    >
      <div className="pb-[50px] max-w-[79.603%] sm:max-w-[85.463%] sm:pb-[40px] lg:max-w-[82.463%] lg:pb-[35px] md:max-w-[78%] md:pb-[30px] xs:max-w-full xs:pb-[20px]">
        <h2 className="uppercase font-medium text-[22px] leading-[38px] mb-[20px] sm:text-[28px] lg:text-[40px] sm:leading-[40px] sm:mb-[18px] lg:leading-[42px] lg:mb-[16px] md:text-[30px] md:leading-[36px] md:mb-[16px] xs:text-[24px] xs:leading-[30px]">
          {title}
        </h2>
        <p className="text-[16px] leading-[25px] text-gray40 sm:text-[15px] sm:leading-[22px] lg:text-[15px] lg:leading-[22px] md:text-[14px] md:leading-[21px] xs:text-[13px] xs:leading-[20px]">
          {desc}
        </p>
      </div>

      {img && (
        <img
          src={img}
          alt="decorative"
          className="hidden md:block absolute top-0 right-0 sm:-top-[55px] sm:-right-[49px] sm:w-[260px] sm:h-[260px] lg:w-[220px] lg:h-[220px] md:w-[200px] md:h-[200px] object-contain pointer-events-none select-none"
          style={{
            transform: "translateY(-4%)",
            maxHeight: "520px",
          }}
        />
      )}
    </div>
  );
}
