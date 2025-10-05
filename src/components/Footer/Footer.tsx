import InfinitScroll from './InfinitScroll'
import { FooterColumnData, FooterMediaData, InfinitScrollData } from '../../Data/FooterData';
import LogoSvg from './LogoSvg';
import FooterMedia from './FooterMedia'
import FooterColumn from './FooterColumn'
import { Link } from 'react-router-dom';

export default function () {
  return (
    <footer className=' mt-52 '>
      <InfinitScroll contentsBar={InfinitScrollData} />
      <div className=" flex flex-wrap items-center justify-between gap-[30px] border-t-2 border-dashed  border-black20 py-[50px] px-[16px] sm:p-[80px] 2xl:py-[100px] 2xl:px-[162px] ">
        <div className='text-black dark:text-white max-w[357px] sm:max-w[630px]  2xl:max-w[788.31px] h-fit'>
          <LogoSvg />
        </div>
        <FooterMedia
          AllMedia={FooterMediaData}
        />
      </div>

      <div className='flex flex-wrap items-center gap-[30px] sm:gap-[50px] border-t-2 border-b-2 border-dashed border-black20 py-[40px] px-[16px]  sm:py-[60px] sm:px-[80px] 2xl:py-[80px] 2xl:px-[162px]'>
        {
          FooterColumnData.map((column) => {
            return (
              <FooterColumn
                {...column}
              />
            )
          })
        }
        <div className='flex-1 basis-[300px]'>
          <FooterColumn
            ColumnLink='Subscribe to Newsletter'
            isSubscrbe={true}
          />
        </div>

      </div>
      <div className="px-[162px] py-[50px] max-2xl:px-[80px] max-2xl:py-[40px] max-md:px-[16px] max-md:py-[30px] flex justify-between max-md:flex-col max-md:items-start max-md:gap-[20px]">
        <p className='text-gray40 text-[18px] xl:text-[14px]'>© 2024 StyleLoom.   All rights reserved.</p>
        <ul className="flex">
          <li className="text-gray40 text-[18px] xl:text-[14px]"><Link to={'/terms'}>Terms & Conditions</Link> <span className='text-black20] px-[10px]'>|</span></li>
          <li className="text-gray40 text-[18px] xl:text-[14px]" ><Link to={'/privacy'}>Privacy Policy</Link></li>
        </ul>
      </div>
    </footer>
  )
}