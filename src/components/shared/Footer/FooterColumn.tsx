import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";

export interface FooterColumnProps {
    ColumnLink: string;
    items?: string[];
    isSubscrbe: boolean

}

export default function FooterColumn({ ColumnLink, items, isSubscrbe }: FooterColumnProps) {
    return (
        <div className="flex flex-col gap-[20px] sm:gap-[24px] 2xl:gap-[px] ">
            <Link
                className="font-medium text-base sm:text-lg 2xl:text-[22px] leading-[100%]  text-white "
                to={ColumnLink}
            >{ColumnLink}</Link>
            {
                !isSubscrbe && (
                    <ul className="list-disc  flex flex-row flex-wrap items-center gap-[10px] sm:gap-[12px] 2xl:gap-[16px]">
                        {items?.map((item, index) => (
                            <li key={index} className={`font-normal text-sm sm:text-base 2xl:text-xl leading-[150%] font-robotmono text-gray40
                    ${index === 0 ? 'list-none mr-[12px]' : 'ml-[12px]'}`}>
                                {item}
                            </li>
                        ))}
                    </ul>
                )
            }
            {
                isSubscrbe && (
                    <form className='flex flex-1 justify-between rounded-[7px] 2xl:rounded-[12px] bg-black10 py-[14px] px-[20px] 2xl:px-[24px] 2xl:py-[18px]'>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full font-normal outline-0 text-sm  2xl:text-xl leading-[150%] font-robotmono text-gray40 cursor-pointer overflow-hidden border-0" />
                        <button type="submit"><MdAlternateEmail color="#676665"/></button>
                    </form>

                )
            }

        </div>
    )
}