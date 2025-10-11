import { useEffect, useMemo, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import ProductComponent from "./ProductComponent";
import TitleComponent from "../TitleComponent/TitleComponent";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { fetchProducts } from "../../redux/slices/productsSlice";

export default function ProductsSectionComponent(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items: products, loading, error } = useAppSelector((s) => s.products);

  const [activeTab, setActiveTab] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3); // default

  // Adjust itemsPerPage on window resize
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerPage(3); // large
      else if (width >= 768) setItemsPerPage(2); // medium
      else setItemsPerPage(1); // small
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, products.length]);

  const filteredProducts = useMemo(() => {
    if (activeTab === "All") return products;
    return products.filter((p) => p.category?.toLowerCase() === activeTab.toLowerCase());
  }, [products, activeTab]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, totalItems, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Pagination helper (ellipses)
  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="w-full 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
      <section className="border-2 border-dashed border-black15 rounded-xl flex flex-col">
        {/* Title & Tabs */}
        <div className="flex flex-col font-[var(--second-font)] overflow-hidden">
          <div className="relative">
            <TitleComponent
              title="Elevate Your Style with Our Latest Collection"
              desc="Each piece is crafted to enhance your fashion statement."
              fullImage={false}
              img={"/assets/imgs/AbstractDesign.png"}
              imgMobile={true}
            />
          </div>

          <ul className="flex gap-[14px] text-gray70 list-none font-[var(--second-font)] pl-20 pb-20 max-[540px]:pb-[30px] max-[540px]:pl-5 max-[540px]:overflow-x-auto max-[540px]:scroll-snap-x max-[540px]:scrollbar-none">
            {["All", "Men", "Women", "Kids"].map((category) => (
              <li
                key={category}
                onClick={() => setActiveTab(category)}
                className={`cursor-pointer rounded-xl px-6 py-[18px] text-[18px] transition duration-300 ease-in-out max-[540px]:py-[14px] ${
                  activeTab === category
                    ? "bg-brown70 text-black06"
                    : "hover:bg-brown70 hover:text-black06"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
          {loading && <div className="col-span-full p-8 text-center">Loading products...</div>}
          {error && <div className="col-span-full p-8 text-center text-red-600">{error}</div>}
          {!loading &&
            !error &&
            paginatedProducts.map((product) => (
              <ProductComponent
                key={product.id}
                id={product.id}
                img={product.img}
                title={product.title}
                category={product.category}
                fit={product.fit ?? ""}
                price={product.price ?? 0}
              />
            ))}
        </div>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between p-3.5 gap-4">
            <div className="text-sm text-gray-400">
              Showing <span className="text-white">{Math.min(startIndex + 1, totalItems)}</span>
              {" — "}
              <span className="text-white">{Math.min(endIndex, totalItems)}</span>
              {" of "}
              <span className="text-white">{totalItems}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md border text-white border-white/10 ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white/5"
                }`}
              >
                Prev
              </button>

              <div className="flex items-center gap-1">
                {pageNumbers.map((num, idx) =>
                  num === "..." ? (
                    <span key={`dots-${idx}`} className="px-3 py-1 text-gray-400">...</span>
                  ) : (
                    <button
                      key={num}
                      onClick={() => setCurrentPage(Number(num))}
                      className={`px-3 py-1 rounded-md border border-white/10 ${
                        currentPage === num ? "bg-brown70 text-white" : "bg-transparent text-gray-200 hover:bg-white/5"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md border text-white border-white/10 ${
                  currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-white/5"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
