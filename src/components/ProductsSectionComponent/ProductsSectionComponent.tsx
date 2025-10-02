// src/components/ProductsSectionComponent/ProductsSectionComponent.tsx
import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import ProductComponent from "./ProductComponent";
import TitleComponent from "../TitleComponent/TitleComponent";

type RawProduct = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string | null;
  price?: number;
  subCategory?: {
    name?: string;
    main?: {
      name?: string;
    };
  };
};

type MappedProduct = {
  id: number;
  img: string;
  title: string;
  category: "All" | "Men" | "Women" | "Kids" | string;
  fit?: string;
  price?: number;
};

export default function ProductsSectionComponent(): JSX.Element {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [products, setProducts] = useState<MappedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTabClick = (category: string) => {
    setActiveTab(category);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        const headers: Record<string, string> = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch("http://localhost:3000/api/product", {
          headers,
        });

        if (res.status === 401) {
          setError("غير مصرح — الرجاء تسجيل الدخول للوصول إلى المنتجات.");
          setProducts([]);
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: RawProduct[] = await res.json();

        const mapped: MappedProduct[] = data.map((p) => {
          const rawImg = p.imageUrl ?? "";
          const img =
            rawImg.startsWith("http") || rawImg.startsWith("data:")
              ? rawImg
              : rawImg
              ? `http://localhost:3000${rawImg}`
              : "/assets/imgs/default-product.jpg";

          const mainName = p.subCategory?.main?.name?.toLowerCase() ?? "";
          let category: MappedProduct["category"] = "All";
          if (mainName === "child" || mainName === "kids") category = "Kids";
          else if (mainName === "man" || mainName === "men") category = "Men";
          else if (mainName === "woman" || mainName === "women") category = "Women";
          else category = p.subCategory?.name ?? "Other";

          return {
            id: p.id,
            img,
            title: p.name,
            category,
            fit: p.description ?? "",
            price: p.price ?? 0,
          };
        });

        setProducts(mapped);
      } catch (err: any) {
        setError(err.message || "فشل جلب المنتجات");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeTab === "All"
      ? products
      : activeTab === "Women"
      ? products.filter((p) => p.category === "Women")
      : activeTab === "Men"
      ? products.filter((p) => p.category === "Men")
      : activeTab === "Kids"
      ? products.filter((p) => p.category === "Kids")
      : products.filter((p) => p.category === activeTab);

  return (
    <div className="w-full 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px] ">
      <section className="border-2 border-dashed border-black15 rounded-xl flex flex-col ">
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

          {/* Tabs */}
          <ul className="flex gap-[14px] text-gray70 list-none font-[var(--second-font)] pl-20 pb-20 max-[540px]:pb-[30px] max-[540px]:pl-5 max-[540px]:overflow-x-auto max-[540px]:scroll-snap-x max-[540px]:scrollbar-none">
            {["All", "Men", "Women", "Kids"].map((category) => (
              <li
                key={category}
                onClick={() => handleTabClick(category)}
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
        <div className="flex flex-wrap">
          {loading && (
            <div className="w-full p-8 text-center">جارِ تحميل المنتجات...</div>
          )}

          {error && (
            <div className="w-full p-8 text-center">
              <div className="mb-4 text-red-600">{error}</div>

              {(error.toLowerCase().includes("تسجيل الدخول") ||
                error.toLowerCase().includes("غير مصرح")) && (
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 rounded-lg bg-brown70 text-black06"
                  >
                    اذهب لتسجيل الدخول
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 rounded-lg border"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              )}
            </div>
          )}

          {!loading &&
            !error &&
            filteredProducts.map((product: any) => (
              <ProductComponent
                key={product.id}
                id={product.id}
                img={product.img}
                title={product.title}
                category={product.category}
                fit={product.fit}
                price={product.price}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

