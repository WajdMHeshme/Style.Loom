// src/pages/Favourite.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/store/hooks";
import { clearFavorites } from "../redux/slices/FavoritesSlice";
import { MdFavoriteBorder, MdProductionQuantityLimits } from "react-icons/md";
import ProductComponent from "../components/ProductsSectionComponent/ProductComponent";

type Fav = {
  id: number | string;
  image?: string;
  title?: string;
  price?: number;
  category?: string;
  fit?: string;
  [key: string]: any;
};

const Favourite: React.FC = () => {
  const favorites = useAppSelector((s: any) => s.favorites) as Fav[];
  const dispatch = useAppDispatch();

  return (
    // If your navbar height is different, adjust pt-[200px] accordingly (or use pt-24)
    <div className="2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl  text-white scroll-mt-24 flex items-center gap-2">
            Favorites{" "}
            <span>
              <MdFavoriteBorder color="#c2b4a3" />
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {favorites.length} item{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/products">
            <button className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition">
              Browse products
            </button>
          </Link>

          <button
            onClick={() => dispatch(clearFavorites())}
            disabled={favorites.length === 0}
            className="px-4 py-2 rounded-lg border border-dashed text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Empty state */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <MdProductionQuantityLimits size={200} color="#ae9b84" />

          <h2 className="mt-6 text-xl font-semibold text-white">
            No favorites yet
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Add items to your favorites to see them here.
          </p>

          <Link to="/products">
            <button className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r  bg-brown60 text-white shadow-lg">
              Browse products
            </button>
          </Link>
        </div>
      ) : (
        /* Grid of favorite items (kept cards structure like before using flex-wrap) */
        <div className="flex flex-wrap -mx-4">
          {favorites.map((p) => (
            <div key={p.id} className="px-4 w-full md:w-1/2 lg:w-1/3 mb-6">
              {/* Outer card wrapper (visual) */}
              <div className="relative bg-white/3 p-4 rounded-2xl shadow-sm hover:shadow-lg transition h-full">
                {/* If you still want a remove button here, you can re-add it with e.stopPropagation() */}
                {/* ProductComponent wrapped with Link so clicking the card navigates to product detail */}
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <ProductComponent
                        id={typeof p.id === "number" ? p.id : Number(p.id)}
                        img={p.image || ""}
                        title={p.title || "Untitled"}
                        price={p.price ?? 0}
                        fit={p.fit || "-"}
                        category={p.category || "General"}
                        className="w-full"
                      />
                    </div>

                    <div className="mt-auto flex items-center justify-between px-2">
                      <div>
                        <p className="text-sm text-gray-300">
                          {p.category || "General"}
                        </p>
                        <p className="text-base font-semibold text-white">
                          ${(p.price ?? 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
