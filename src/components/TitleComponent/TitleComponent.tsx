
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
            className={`relative text-white max-w-full ${fullImage ? "overflow-hidden" : ""
                } pt-[80px] pr-0 px-[80px] sm:pt-[60px] sm:pl-[60px] lg:pt-[50px] lg:pl-[50px] md:pt-[40px] md:pl-[40px] xs:pt-[30px] xs:px-[20px]`}
        >
            <div
                className="pb-[80px] max-w-[79.603%] sm:max-w-[85.463%] sm:pb-[60px] lg:max-w-[82.463%] lg:pb-[50px] md:max-w-[78%] md:pb-[40px] xs:max-w-full xs:pb-0"
            >
                <h2
                    className="uppercase font-medium text-[48px] leading-[56.25px] mb-[30px] sm:text-[38px] sm:leading-[44.53px] sm:mb-[24px] lg:text-[35px] lg:leading-[41.53px] lg:mb-[22px] md:text-[32px] md:leading-[38px] md:mb-[20px] xs:text-[28px] xs:leading-[32.81px]"
                >
                    {title}
                </h2>
                <p
                    className="text-[18px] leading-[27px] text-gray40 sm:text-[16px] sm:leading-[24px] lg:text-[16px] lg:leading-[24px] md:text-[15px] md:leading-[22px] xs:text-[14px] xs:leading-[21px]"
                >
                    {desc}
                </p>
            </div>
            {img &&
                <img
                    src={img}
                    alt="star icon"
                    className="absolute top-0 right-0 sm:-top-[55px] sm:-right-[49px] sm:w-[280px] sm:h-[280px] lg:w-[240px] lg:h-[240px] md:w-[220px] md:h-[220px] xs:hidden"
                />
            }

        </div>
    );
}
