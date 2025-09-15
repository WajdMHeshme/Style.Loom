export interface FooterMediaProps {
  AllMedia: string[];
}

export default function FooterMedia({ AllMedia }: FooterMediaProps) {
  return (
    <div className="flex items-center gap-[16px] 2xl:gap-[20px]">
      {AllMedia.map((media) => {
        return (
          <button className="flex items-center justify-center p-[14px] 2xl:p-[18px] rounded-[12px] bg-brown-80">
            <a href="#">
              <img
                src={media}
                alt="MediaIcon"
              />
            </a>
          </button>
        );
      })}
    </div>
  );
}
