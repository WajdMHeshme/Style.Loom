import  { useState } from "react";
import ProductComponent from "./ProductComponent";
import TitleComponent from "../TitleComponent/TitleComponent";
import { productsData } from "../../Data/productsData";

export default function ProductsSectionComponent() {
    const [activeTab, setActiveTab] = useState<string>("Women");

    const handleTabClick = (category: string) => {
        setActiveTab(category);
    };

    const filteredProducts =
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
        <div className="w-full 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px] ">
            <section className="border-2 border-dashed border-black15 rounded-xl flex flex-col ">
                {/* 🔹 Title & Tabs */}
                <div className="  flex flex-col font-[var(--second-font)] overflow-hidden">
                    <div className="relative">
                        <TitleComponent
                            title="Elevate Your Style with Our Latest Collection"
                            desc="Each piece is crafted to enhance your fashion statement."
                            fullImage={false}
                            img={"/assets/imgs/AbstractDesign.png"}
                            imgMobile={true}
                        />
                    </div>

                    {/* 🔹 Tabs */}
                    <ul className="flex gap-[14px] text-gray70 list-none font-[var(--second-font)] pl-20 pb-20 max-[540px]:pb-[30px] max-[540px]:pl-5 max-[540px]:overflow-x-auto max-[540px]:scroll-snap-x max-[540px]:scrollbar-none">
                        {["All", "Men", "Women", "Kids"].map((category) => (
                            <li
                                key={category}
                                onClick={() => handleTabClick(category)}
                                className={`cursor-pointer rounded-xl px-6 py-[18px] text-[18px] transition duration-300 ease-in-out max-[540px]:py-[14px] ${activeTab === category
                                        ? "bg-brown70 text-black06"
                                        : "hover:bg-brown70 hover:text-black06"
                                    }`}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 🔹 Products */}
                <div className="flex flex-wrap">
                    {filteredProducts.map((product: { img: any; title: any; category: any; fit: any; price: any; }, index: any) => (
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
