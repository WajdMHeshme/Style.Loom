import { useState } from "react";
import { productsData } from "../../Data/productsData";
import titleImg from "../../assets/imgs/AbstractDesign.png";
import TitleComponent from "../TitleComponent/TitleComponent";
import ProductComponent from "../AllProductsSection/ProductComponent";
import ButtonComponent from "../ButtonComponent";

// Product type
type ProductType = {
  img: string;
  title: string;
  category: string;
  fit: string;
  price: number | string;
};

type TabType = "All" | "Men" | "Women" | "Kids";

export default function ProductsPageComponent() {
  const [activeTab, setActiveTab] = useState<TabType>("Women");

  const handleTabClick = (category: TabType) => {
    setActiveTab(category);
  };

  const filteredProducts: ProductType[] =
    activeTab === "All"
      ? [
          ...productsData.womenProductsData,
          ...productsData.kidsProductsData,
          ...productsData.menProductsData,
        ]
      : activeTab === "Women"
      ? productsData.womenProductsData
      : activeTab === "Men"
      ? productsData.menProductsData
      : productsData.kidsProductsData;

  return (
    <div className="pt-[100px]">
      <section className="flex flex-col">
        {/* Upper: Title + Tabs */}
        <div className="flex flex-col gap-6">
          <div className="w-full">
            <TitleComponent
              title="Elevate Your Style with Our Latest Collection"
              desc="Each piece is crafted to enhance your fashion statement."
              fullImage={false}
              img={titleImg}
            />
          </div>

          {/* Tabs */}
          <ul className="flex gap-3 flex-wrap">
            {(["All", "Men", "Women", "Kids"] as TabType[]).map((category) => (
              <li
                key={category}
                onClick={() => handleTabClick(category)}
                className={`cursor-pointer px-4 py-2 border rounded text-[18px] ${
                  activeTab === category
                    ? "bg-gray-900 text-white"
                    : "bg-transparent text-gray-300"
                }`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* View All Section */}
        <div className="flex justify-between items-center p-[24px] sm:p-[30px]">
          <h3
            className="uppercase
              text-[1.5rem] leading-[28.13px]
              sm:text-[1.625rem] sm:leading-[30.47px]
              lg:text-[1.875rem] lg:leading-[35.16px]
              text-[var(--white-color)]
            "
          >
            Dress Collection
          </h3>

          {/* زر مخفي على الشاشات الصغيرة (<=640px) */}
          <div className="hidden sm:inline-flex">
            <ButtonComponent text="View All" />
          </div>
        </div>

        {/* Products list */}
        <div className="flex flex-wrap gap-4">
          {filteredProducts.map((product, index) => (
            <ProductComponent
              key={index}
              id={index}
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
