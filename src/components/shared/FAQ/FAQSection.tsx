import { useEffect, useRef, useState } from "react";

// Types
interface Btn {
  filter: string;
  txt: string;
}

interface FaqApiItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

export default function FAQComponent() {
  const btns: Btn[] = [
    { filter: "All", txt: "All" },
    { filter: "Ordering", txt: "Ordering" },
    { filter: "Shipping", txt: "Shipping" },
    { filter: "Returns", txt: "Returns" },
    { filter: "Support", txt: "Support" },
  ];

  const [activeBtn, setActiveBtn] = useState<string>("All");
  const [isHide, setIsHide] = useState<boolean>(true);

  const [faqs, setFaqs] = useState<FaqApiItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ref array to store right-side card elements (one ref per pair)
  // index: Math.floor(itemIndex / 2)
  const hideSideRefs = useRef<(HTMLDivElement | null)[]>([]);

  function activeTab(filter: string) {
    setActiveBtn(filter);
  }

  // Reset refs and hide-state when category changes
  useEffect(() => {
    hideSideRefs.current = [];
    setIsHide(true);
  }, [activeBtn]);

  // helper: try to find token in multiple common places in localStorage
  function getStoredToken(): string | null {
    const possibleKeys = ["token", "accessToken", "authToken"];
    for (const k of possibleKeys) {
      const v = localStorage.getItem(k);
      if (v) return v;
    }
    const userRaw = localStorage.getItem("user") || localStorage.getItem("auth");
    if (userRaw) {
      try {
        const parsed = JSON.parse(userRaw);
        return parsed?.token || parsed?.accessToken || null;
      } catch {
        // not JSON, ignore
      }
    }
    return null;
  }

  // fetch FAQs from API with Authorization header if token exists
  useEffect(() => {
    const controller = new AbortController();
    async function fetchFaqs() {
      setLoading(true);
      setError(null);
      try {
        const token = getStoredToken();

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch("http://localhost:3000/api/dashboard/faq", {
          signal: controller.signal,
          headers,
        });

        if (res.status === 401) {
          setError("Unauthorized (401). Please log in.");
          return;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: FaqApiItem[] = await res.json();
        setFaqs(data);
      } catch (err: any) {
        if (err.name !== "AbortError") setError(err.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
    return () => controller.abort();
  }, []);

  // toggle show/hide for right-side cards (used on small screens)
  const toggleAll = () => {
    const anyHidden = hideSideRefs.current.some(
      (ref) => !ref || ref.style.display !== "block"
    );

    hideSideRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.display = anyHidden ? "block" : "none";
      }
    });

    setIsHide(!anyHidden);
  };

  // prepare filtered list (consider only active items)
  const normalizedActive = activeBtn.toUpperCase();
  const filtered = faqs.filter((f) => {
    if (!f.isActive) return false;
    if (normalizedActive === "ALL") return true;
    return f.category?.toUpperCase() === normalizedActive;
  });

  return (
    <div className="w-full 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
      <div className="w-full font-sans">
        <div
          className="w-full rounded-t-lg border-2 border-dashed border-black15 relative overflow-hidden
                     md:pr-[18rem] pr-[20px] md:pl-[80px] pl-[20px] pt-[80px] pb-[80px]"
        >
          <img
            src={"/assets/imgs/Vector.png"}
            alt=""
            aria-hidden="true"
            className="hidden md:block pointer-events-none absolute top-0 right-0
                       translate-x-[10%] -translate-y-[5%] max-w-[18rem] md:max-w-[22rem]"
          />

          <h2 className="text-[28px] md:text-4xl xl:text-5xl text-white uppercase mb-8">
            Have Questions? We Have Answers.
          </h2>
          <p className="text-lg text-gray40 mb-12">
            Ease into the world of StyleLoom with clarity. Our FAQs cover a
            spectrum of topics.
          </p>

          {/* buttons */}
          <div className="flex gap-3 overflow-x-auto whitespace-nowrap ">
            {btns.map((btn, index) => (
              <button
                key={index}
                className={`px-6 py-4 h-16 rounded-lg text-base font-medium border border-transparent ${
                  activeBtn === btn.filter
                    ? "bg-brown70 text-black px-8"
                    : "bg-transparent text-gray40"
                }`}
                onClick={() => activeTab(btn.filter)}
              >
                {btn.txt}
              </button>
            ))}
          </div>
        </div>

        {/* loading / error */}
        {loading && (
          <p className="text-gray40 mt-6">Loading FAQs — please wait...</p>
        )}
        {error && (
          <p className="text-red-400 mt-6">Failed to load FAQs: {error}</p>
        )}

        {/* cards */}
        <div className="flex flex-wrap w-full">
          {filtered.length === 0 && !loading && (
            <div className="p-8 w-full text-gray40">No FAQs found.</div>
          )}

          {filtered.map((item, index) => {
            // ref index for right-side items (odd indices)
            const refIndex = Math.floor(index / 2);

            // even index => left card; odd index => right card
            if (index % 2 === 0) {
              return (
                <div
                  className="p-8 md:p-16 w-full md:w-1/2 border-l-2 border-b-2 border-dashed border-black15"
                  id={`card-${item.id}`}
                  key={`left-${item.id}`}
                >
                  <h3 className="text-2xl md:text-3xl text-white mb-4">
                    {item.question}
                  </h3>
                  <p className="text-base text-gray40">{item.answer}</p>
                </div>
              );
            } else {
              return (
                <div
                  ref={(el) => {
                    hideSideRefs.current[refIndex] = el;
                  }}
                  className="p-8 md:p-16 w-full md:w-1/2 border-l-2 border-r-2 border-b-2 border-dashed border-black15"
                  id={`card-${item.id}`}
                  key={`right-${item.id}`}
                >
                  <h3 className="text-2xl md:text-3xl text-white mb-4">
                    {item.question}
                  </h3>
                  <p className="text-base text-gray40">{item.answer}</p>
                </div>
              );
            }
          })}
        </div>

        {/* View all (visible on smaller screens only) */}
        <button
          className="block md:hidden w-full bg-transparent text-gray40 border-0 outline-0 py-8 border-l-2 border-r-2 border-b-2 border-dashed border-black15 rounded-b-lg"
          onClick={toggleAll}
        >
          {isHide ? "View All" : "Hide"}
        </button>
      </div>
    </div>
  );
}
