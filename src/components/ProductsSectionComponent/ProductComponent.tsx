// src/components/ProductsSectionComponent/ProductComponent.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { toggleFavorite } from "../../redux/slices/FavoritesSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import SuccessMessage from "../../utils/SuccessMessage"; // adjust path if necessary
import type { Product as FavProduct } from "../../redux/slices/FavoritesSlice";

export type ProductProps = {
  id: number;
  img: string;
  title: string;
  price: number;
  fit: string;
  category: string;
  className?: string;
};

const ProductComponent: React.FC<ProductProps> = ({
  img,
  title,
  price,
  fit,
  category,
  id,
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favorites = useAppSelector((s: any) => s.favorites);
  const strId = String(id);
  const isFav = favorites.some((p: any) => p.id === strId);
  const parsedPrice = typeof price === "number" ? price : Number(price);

  // Get userId from redux auth slice (fallback to 1 only as default development id)
  const userIdFromStore = useAppSelector((s: any) => s.auth?.user?.id);
  // keep same behavior as before (default 1) but we now read from redux first
  const userId = typeof userIdFromStore === "number" && userIdFromStore > 0 ? Number(userIdFromStore) : 1;

  // local state to control the success popup visibility and message
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

  // Toggle favorite button handler
  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    const payload: FavProduct = {
      id: strId,
      title,
      price: parsedPrice,
      image: img,
      fit,
      category,
    };
    dispatch(toggleFavorite(payload));
  };

  // Add to cart handler with optimistic UI feedback via SuccessMessage
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      console.log("[UI] Add to cart clicked:", { userId, productId: id });
      // call thunk and unwrap result so we can catch errors as exceptions
      await dispatch(addToCart({ userId, productId: id, quantity: 1 })).unwrap();

      // if success -> set success message and show popup
      setSuccessMessage(`${title} has been added to your cart.`);
      setShowSuccess(true);
    } catch (err) {
      console.error("Add to cart failed:", err);
      // optionally show an error toast here
      setSuccessMessage("Failed to add to cart.");
      setShowSuccess(true);
    }
  };

  // Close handler for success popup
  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSuccessMessage(undefined);
  };

  // Navigate to product details page (passes product in location.state)
  const handleNavigateToDetails = () => {
    const productForState = {
      id,
      name: title,
      description: undefined,
      imageUrl: img,
      price: parsedPrice,
      stock: undefined,
      createdAt: undefined,
    };
    navigate(`/product/${id}`, { state: { product: productForState } });
  };

  // allow Enter key to activate navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigateToDetails();
    }
  };

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

  return (
    <>
      <div
        id={strId}
        role="button"
        tabIndex={0}
        onClick={handleNavigateToDetails}
        onKeyDown={handleKeyDown}
        className={`p-[30px] border border-dashed border-black15 h-fit flex flex-col max-[1919px]:p-5  max-[540px]:w-full max-[540px]:relative ${className}`}
        aria-label={`Open details for ${title}`}
      >
        <div className="w-full h-[60.4%] overflow-hidden rounded-t-[50px] max-[1919px]:rounded-t-[30px] max-[540px]:rounded-t-[20px] relative">
          <img src={img} alt={title} className="w-full object-cover h-[326px]" />

          <div className="absolute top-3 right-3">
            <button
              onClick={handleToggleFav}
              aria-pressed={isFav}
              className={`p-2 rounded-full shadow-md transition-transform hover:scale-105 focus:outline-none ${isFav ? "text-red-500 bg-white/10" : "text-gray-600 bg-black/10"
                }`}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <HeartIcon filled={isFav} size={18} />
            </button>
          </div>
        </div>

        <div className="flex justify-between pt-[38px] pb-5 max-[1919px]:pt-6 max-[1919px]:pb-4 max-[540px]:py-5">
          <div className="px-4 py-2 bg-black10 border border-dashed border-black15 rounded-full flex items-center max-[1919px]:px-3 max-[1919px]:py-2">
            <span className="text-[1.126rem] leading-[27px] font-[var(--main-font)] text-gray70 max-[1919px]:text-sm max-[1919px]:leading-[1.3125rem]">
              {category}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="px-6 py-[18px] rounded-xl border border-dashed border-black25 bg-[var(--black12-color)] text-white font-[var(--main-font)] max-[1919px]:px-4 max-[1919px]:py-[14px] max-[1919px]:rounded-lg max-[854px]:px-4 max-[854px]:py-3 max-[854px]:text-xs"
            aria-label={`Add ${title} to cart`}
            title={`Add ${title} to cart`}
          >
            Add to Cart
          </button>
        </div>

        <div className="text-white font-[var(--second-font)] text-2xl leading-9 tracking-[1px] max-[1919px]:text-[1.125rem] max-[1919px]:leading-[1.6875rem] max-[854px]:text-base max-[854px]:leading-[1.6875rem]">
          {title}
        </div>

        <div className="flex gap-5 mt-[14px] font-[var(--second-font)] text-[18px] justify-start max-[1919px]:gap-4 max-[1919px]:mt-2.5 max-[1919px]:text-base max-[854px]:text-sm max-[540px]:gap-2.5">
          <div className="flex gap-2 text-gray80 items-center">
            <span className="text-gray50 text-sm max-[1919px]:text-sm">Fit.</span>
            <span className="text-white text-sm truncate max-w-[10rem]">{fit && String(fit).trim() !== "" ? fit : "-"}</span>
          </div>
          <div className="flex gap-2 text-gray80 items-center">
            <span className="text-gray50 text-sm max-[1919px]:text-sm">Price.</span>
            <span className="text-white text-sm">${parsedPrice}</span>
          </div>
        </div>
      </div>

      {/* Success popup - shown after a successful add to cart */}
      <SuccessMessage
        isVisible={showSuccess}
        onClose={handleSuccessClose}
        title="Added to cart"
        message={successMessage}
        autoClose={true}
        autoCloseDelay={3500}
      />
    </>
  );
};

export default ProductComponent;
 