import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { toggleFavorite } from "../../redux/FavoritesSlice";
import type { Product as FavProduct } from"../../redux/FavoritesSlice";

// Props interface
interface ProductComponentProps {
  img: string;
  title: string;
  price: number | string;
  fit: string;
  category: string;
  id: number | string;
}

const HeartIcon: React.FC<{ filled?: boolean; size?: number }> = ({ filled = false, size = 18 }) =>
  filled ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.14 4.14 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 17.86 4 20 6.14 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

const ProductComponent: React.FC<ProductComponentProps> = ({
  img,
  title,
  price,
  fit,
  category,
  id,
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.favorites);
  const strId = String(id);
  const isFav = favorites.some((p) => p.id === strId);

  // convert price to number if possible (so favorites store number)
  const parsedPrice =
    typeof price === "number" ? price : typeof price === "string" && !isNaN(Number(price)) ? Number(price) : undefined;

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    const payload: FavProduct = {
      id: strId,
      title,
      price: parsedPrice,
      image: img,
      fit: "",
      category: ""
    };
    dispatch(toggleFavorite(payload));
  };

  return (
    <div
      id={strId}
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
            relative
          "
        >
          <img
            src={img}
            alt={title}
            className="w-full h-[326px] object-cover block"
          />

          {/* Favorite button (overlay top-right) */}
          <div className="absolute top-3 right-3">
            <button
              onClick={handleToggleFav}
              aria-pressed={isFav}
              aria-label={isFav ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
              className={`p-2 rounded-full shadow-md transition-transform hover:scale-105 focus:outline-none ${
                isFav ? "text-red-500 bg-white/10" : "text-gray-600 bg-black/10"
              }`}
              title={isFav ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
            >
              <HeartIcon filled={isFav} size={18} />
            </button>
          </div>
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
