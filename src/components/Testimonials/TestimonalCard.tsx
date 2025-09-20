
import Design from "./../../assets/imgs/Testimonials/Design.png";
interface TestimonialCardProps {
  person: string;
  personName: string;
  personCity: string;
  description: string;
  border?: "border1" | "border2" | "border3" | "border4" | "border5" | "border6" | string;
  className?: string;
}

export default function TestimonialCard({
  person,
  personName,
  personCity,
  description,
  border = "",
  className = "",
}: TestimonialCardProps) {
  // map your old border classes to Tailwind utilities + inline styles for color
  const borderStyles: Record<string, string> = {
    border1: "border-b-2 border-dashed border-black15",
    border2: "border-b-2 border-l-2 border-dashed border-black15",
    border3: "border-b-2 border-l-2 border-dashed border-black15",
    border4: "border-l-2 border-dashed border-black15",
    border5: "border-l-2 border-dashed border-black15",
    border6: "border-l-2 border-t-2 xl:border-t-0 border-dashed border-black15",
  };

  const designPosition: Record<string, string> = {
    border1: "absolute bottom-0 left-[-3px] rotate-90 border-red",
    border2: "hidden",
    border3: "absolute bottom-0 right-[-3px]",
    border4: "absolute top-0 left-[-4px] rotate-180",
    border5: "hidden",
    border6: "absolute top-0 right-[-2px] -rotate-90",
  };

  const appliedBorderClass = border && borderStyles[border] ? borderStyles[border] : "";
  const appliedDesignClass = border && designPosition[border] ? designPosition[border] : "absolute bottom-0 right-0";

  return (
    <section
      className={`relative w-full bg-transparent ${appliedBorderClass} ${className} p-6 md:p-12 sm:p-8 h-[385px] md:h-[312px] lg:h-[312px] sm:h-[241px] overflow-hidden`}
    >
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <div className="flex items-center">
          <img
            src={person}
            alt={personName}
            className="w-20 h-20 rounded-full mr-3 md:w-16 md:h-16 sm:w-12 sm:h-12 object-cover"
          />

          <div className="flex flex-col">
            <span className="text-xl font-medium text-white leading-7 md:text-lg sm:text-base">
              {personName}
            </span>
            <span className="text-lg font-normal text-gray-400 leading-6 md:text-base sm:text-sm">
              {personCity}
            </span>
          </div>
        </div>

        {/* Twitter icon - using react-icons is fine, but keep it styled with Tailwind */}
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-brown70 md:w-7 md:h-7 sm:w-6 sm:h-6"
            aria-hidden
          >
            <path d="M23 4.558a9.83 9.83 0 01-2.828.775 4.93 4.93 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.38 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.9 4.9 0 01-2.228-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.918 4.918 0 004.59 3.417A9.867 9.867 0 010 19.54a13.93 13.93 0 007.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.014-.636A9.935 9.935 0 0023 4.558z" />
          </svg>
        </div>
      </div>

      <div className="mt-10 md:mt-8 sm:mt-6">
        <div className="flex items-center mb-6 md:mb-4 sm:mb-3">
          {/* 5 golden stars */}
          <svg className="w-6 h-6 mr-1 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="#FFCE22" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.6L19.336 24 12 19.897 4.664 24l1.586-8.65L.5 9.75l7.832-1.732L12 .587z" />
          </svg>
          <svg className="w-6 h-6 mr-1 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="#FFCE22" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.6L19.336 24 12 19.897 4.664 24l1.586-8.65L.5 9.75l7.832-1.732L12 .587z" />
          </svg>
          <svg className="w-6 h-6 mr-1 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="#FFCE22" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.6L19.336 24 12 19.897 4.664 24l1.586-8.65L.5 9.75l7.832-1.732L12 .587z" />
          </svg>
          <svg className="w-6 h-6 mr-1 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="#FFCE22" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.6L19.336 24 12 19.897 4.664 24l1.586-8.65L.5 9.75l7.832-1.732L12 .587z" />
          </svg>
          <svg className="w-6 h-6 mr-1 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="#FFCE22" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 .587l3.668 7.431L23.5 9.75l-5.75 5.6L19.336 24 12 19.897 4.664 24l1.586-8.65L.5 9.75l7.832-1.732L12 .587z" />
          </svg>
        </div>

        <p className="text-base text-gray-300 leading-7 md:text-sm sm:text-sm">{description}</p>
      </div>

      {/* design image positioned depending on the border variant */}
      <img
        src={Design}
        alt="Design element"
        className={`designe ${appliedDesignClass} pointer-events-none w-12 h-12 md:w-10 md:h-10 sm:w-8 sm:h-8`}
      />
    </section>
  );
}
