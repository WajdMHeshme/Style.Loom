interface TitleComponentProps {
  title: string;
  desc: string;
  img?: string;
  imgMobile?: boolean; // لو true => الصورة تظهر حتى على الموبايل
  hideImageBelowMd?: boolean; // لو true => تخفي الصورة تحت md (<768px)
  fullImage?: boolean;
}

export default function TitleComponent({
  title,
  desc,
  img,
  imgMobile,
  hideImageBelowMd = false,
  fullImage = false,
}: TitleComponentProps) {
  // منطق العرض:
  // - لو imgMobile === true => نعرض الصورة على كل الشاشات (block)
  // - وإلا لو hideImageBelowMd === true => نخفي تحت md (hidden md:block)
  // - وإلا => نعرض كالمعتاد (block)
  const imageVisibilityClass = imgMobile
    ? "block"
    : hideImageBelowMd
    ? "hidden md:block"
    : "block md:block";

  return (
    <div
      className={`relative text-white max-w-full ${
        fullImage ? "overflow-hidden" : ""
      } pt-[80px] pr-0 px-[80px] sm:pt-[60px] sm:pl-[60px] lg:pt-[50px] lg:pl-[50px] md:pt-[40px] md:pl-[40px] xs:pt-[30px] xs:px-[20px]`}
    >
      <div className="pb-[80px] max-w-[79.603%] sm:max-w-[85.463%] sm:pb-[60px] lg:max-w-[82.463%] lg:pb-[50px] md:max-w-[78%] md:pb-[40px] xs:max-w-full xs:pb-0">
        <h2
          className="uppercase font-medium text-[24px] leading-[56.25px] mb-[30px] sm:text-[30px] lg:text-[48px] sm:leading-[44.53px] sm:mb-[24px] lg:leading-[41.53px] lg:mb-[22px] md:text-[32px] md:leading-[38px] md:mb-[20px] xs:text-[28px] xs:leading-[32.81px]"
        >
          {title}
        </h2>
        <p className="text-[18px] leading-[27px] text-gray40 sm:text-[16px] sm:leading-[24px] lg:text-[16px] lg:leading-[24px] md:text-[15px] md:leading-[22px] xs:text-[14px] xs:leading-[21px]">
          {desc}
        </p>
      </div>

      {img && (
        <img
          src={img}
          alt="decorative"
          className={`${imageVisibilityClass} absolute top-0 right-0 sm:-top-[55px] sm:-right-[49px] sm:w-[280px] sm:h-[280px] lg:w-[240px] lg:h-[240px] md:w-[220px] md:h-[220px] object-contain pointer-events-none select-none`}
          style={{
            transform: "translateY(-4%)",
            maxHeight: "520px",
          }}
        />
      )}
    </div>
  );
}
