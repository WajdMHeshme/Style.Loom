import { useState, useEffect } from "react";
import { StoredTrendsData } from "../../../Data/TrendsData";
import TrendsCardComponent from "./TrendsCardComponent";
import TitleComponent from "../../shared/TitleComponent/TitleComponent";

export default function TrendsSectionComponent() {
    const [showLastThreeCards, setShowLastThreeCards] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    const toggleLastThreeCards = () => {
        setShowLastThreeCards(!showLastThreeCards);
    };

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]  ">
            <div className="border-2 border-dashed border-black15 rounded-xl">
                <TitleComponent
                    title="Crafting Trends, Inspiring Confidence"
                    desc="Explore a world of fashion at StyleLoom, where trends meet affordability."
                    
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                    {StoredTrendsData.slice(0, -3).map((item: any, idx: number) => (
                        <TrendsCardComponent
                            key={idx}
                            data={item}
                            index={idx}
                            total={StoredTrendsData.length - 3}
                        />
                    ))}
                    {(showLastThreeCards || !isSmallScreen) &&
                        StoredTrendsData.slice(-3).map((item: any, idx: number) => (
                            <TrendsCardComponent
                                key={idx + 3}
                                data={item}
                                index={idx + 3}
                                total={StoredTrendsData.length}
                            />
                        ))}
                </div>

                {isSmallScreen && (
                    <button
                        onClick={toggleLastThreeCards}
                        className="w-full border-t-2 border-dashed border-black15 text-white py-8 text-base font-normal block"
                    >
                        {showLastThreeCards ? "Hide" : "View All"}
                    </button>
                )}
            </div>
        </section>
    );
}
