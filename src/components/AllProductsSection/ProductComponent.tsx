import React from "react";

// Props interface
interface ProductComponentProps {
  img: string;
  title: string;
  price: number | string;
  fit: string;
  category: string;
  id: number | string;
}

const ProductComponent: React.FC<ProductComponentProps> = ({
  img,
  title,
  price,
  fit,
  category,
  id,
}) => {
  return (
    <div
      id={String(id)}
      className="
        w-full md:w-1/2 lg:w-1/3
        p-4 md:p-5 lg:p-[30px]
        border border-dashed
        border-[var(--black15-color)]
        h-fit
        "
    >
      {/* Card */}
      <div className="flex flex-col">
        {/* Image */}
        <div
          className="
            w-full
            overflow-hidden
            rounded-t-[20px] md:rounded-t-[30px] lg:rounded-t-[50px]
            h-[220px] md:h-[240px] lg:h-[260px]
          "
        >
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Row: category + button */}
        <div
          className="
            flex justify-between items-center
            pt-[20px] md:pt-[24px] lg:pt-[38px]
            pb-[12px] md:pb-[16px] lg:pb-[20px]
          "
        >
          <div
            className="
              px-[12px] md:px-[16px] py-[8px] md:py-[10px]
              bg-[var(--black10-color)]
              border border-dashed border-[var(--black15-color)]
              rounded-full
              "
          >
            <span
              className="
                text-[0.875rem] md:text-[1.126rem]
                leading-[1.3125rem] md:leading-[27px]
                font-[var(--main-font)]
                text-[var(--gray70-color)]
              "
            >
              {category}
            </span>
          </div>

          <button
            type="button"
            className="
              px-4 md:px-[24px] py-2 md:py-[18px]
              rounded-[8px] md:rounded-[12px]
              border border-dashed border-[var(--black25-color)]
              bg-[var(--black12-color)]
              text-[var(--white-color)]
              font-[var(--main-font)]
              text-[0.75rem] md:text-[1rem]
            "
          >
            Shop Now
          </button>
        </div>

        {/* Title */}
        <div
          className="
            text-[18px] md:text-[24px]
            leading-[1.4] md:leading-[36px]
            text-[var(--white-color)]
            mb-2
          "
        >
          {title}
        </div>

        {/* Details: fit + price */}
        <div
          className="
            flex flex-wrap items-center gap-[10px] md:gap-[20px]
            mt-[10px] md:mt-[14px]
            font-[var(--second-font)]
            text-[0.875rem] md:text-[1rem]
          "
        >
          <div className="flex items-center gap-[8px] text-[var(--gray80-color)]">
            <span className="text-[var(--gray50-color)]">Fit.</span>
            <span>{fit}</span>
          </div>

          <div className="flex items-center gap-[8px] text-[var(--gray80-color)]">
            <span className="text-[var(--gray50-color)]">Price.</span>
            <span>${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
