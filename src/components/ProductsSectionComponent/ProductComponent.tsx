type ProductProps = {
    id: number;
    img: string;
    title: string;
    price: number;
    fit: string;
    category: string;
};

export default function ProductComponent({
    img,
    title,
    price,
    fit,
    category,
    id,
}: ProductProps) {
    return (
        <div
            id={id.toString()}
            className="
        p-[30px] border border-dashed border-black15
        w-1/3 h-fit flex flex-col
        max-[1919px]:p-5
        max-[1200px]:w-1/2
        max-[540px]:w-full max-[540px]:relative
      "
        >
            {/* Product Image */}
            <div
                className="
          w-full h-[60.4%] overflow-hidden
          rounded-t-[50px] max-[1919px]:rounded-t-[30px] max-[540px]:rounded-t-[20px]
        "
            >
                <img src={img} alt={title} className="w-full object-cover" />
            </div>

            {/* Category + Button */}
            <div
                className="
          flex justify-between pt-[38px] pb-5
          max-[1919px]:pt-6 max-[1919px]:pb-4
          max-[540px]:py-5
        "
            >
                <div
                    className="
            px-4 py-2 bg-black10
            border border-dashed border-black15
            rounded-full flex items-center
            max-[1919px]:px-3 max-[1919px]:py-2
          "
                >
                    <span
                        className="
              text-[1.126rem] leading-[27px] font-[var(--main-font)] text-gray70
              max-[1919px]:text-sm max-[1919px]:leading-[1.3125rem]
            "
                    >
                        {category}
                    </span>
                </div>

                <button
                    type="button"
                    className="
            px-6 py-[18px] rounded-xl border border-dashed border-black25
            bg-[var(--black12-color)] text-white
            font-[var(--main-font)]
            max-[1919px]:px-4 max-[1919px]:py-[14px] max-[1919px]:rounded-lg
            max-[854px]:px-4 max-[854px]:py-3 max-[854px]:text-xs
          "
                >
                    Shop Now
                </button>
            </div>

            {/* Product Title */}
            <div
                className="
          text-white font-[var(--second-font)]
          text-2xl leading-9  tracking-[1px]
          max-[1919px]:text-[1.125rem] max-[1919px]:leading-[1.6875rem]
          max-[854px]:text-base max-[854px]:leading-[1.6875rem]
        "
            >
                {title}
            </div>

            {/* Fit + Price */}
            <div
                className="
          flex gap-5 mt-[14px] font-[var(--second-font)] text-[18px] justify-start
          max-[1919px]:gap-4 max-[1919px]:mt-2.5 max-[1919px]:text-base
          max-[854px]:text-sm max-[540px]:gap-2.5
        "
            >
                <div className="flex gap-2 text-gray80">
                    <span className="text-gray50 text-sm max-[1919px]:text-sm">
                        Fit.
                    </span>
                    {fit}
                </div>
                <div className="flex gap-2 text-gray80">
                    <span className="text-gray50 text-sm max-[1919px]:text-sm">
                        Price.
                    </span>
                    ${price}
                </div>
            </div>
        </div>
    );
}
