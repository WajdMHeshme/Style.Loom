// src/pages/ProductsDetail.tsx
import { useEffect, useState, type JSX } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { addToCart } from "../redux/slices/cartSlice";
import SuccessMessage from "../utils/SuccessMessage"; // عدّل المسار إذا مختلف
// Types
type RawProduct = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string | null;
  price?: number;
  stock?: number;
  createdAt?: string;
  subCategory?: {
    id?: number;
    name?: string;
    main?: {
      id?: number;
      name?: string;
    };
  } | null;
  reviews?: any[];
};

export default function ProductDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<RawProduct | null>(
    (location.state as any)?.product ?? null
  );
  const [loading, setLoading] = useState<boolean>(product ? false : true);
  const [, setError] = useState<string | null>(null);
  const [mainImg, setMainImg] = useState<string | null>(null);

  // success popup state (same behavior as ProductComponent)
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(undefined);

  // get userId from redux (fallback to 1 as before)
  const userIdFromStore = useAppSelector((s: any) => s.auth?.user?.id);
  const userId = typeof userIdFromStore === "number" && userIdFromStore > 0 ? Number(userIdFromStore) : 1;

  useEffect(() => {
    if (product) {
      setMainImg(buildImg(product.imageUrl));
    }
  }, [product]);

  useEffect(() => {
    if (product || !id) return;

    const controller = new AbortController();
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/api/product/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
        });

        if (res.status === 401) {
          setError("Unauthorized - Please log in.");
          setTimeout(() => navigate("/login"), 1200);
          return;
        }

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: RawProduct = await res.json();
        setProduct(data);
        setMainImg(buildImg(data.imageUrl));
      } catch (err: any) {
        if (err.name !== "AbortError")
          setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [id, product, navigate]);

  function buildImg(imgPath?: string | null) {
    const rawImg = imgPath ?? "";
    if (rawImg.startsWith("http") || rawImg.startsWith("data:")) return rawImg;
    if (rawImg) return `http://localhost:3000${rawImg}`;
    return "/assets/imgs/default-product.jpg";
  }

  // --- New: Add to cart handler (same behavior as ProductComponent) ---
  async function handleAddToCart() {
    // same fallback behavior as ProductComponent: read userId from store then fallback to 1
    try {
      console.log("[ProductDetail] Add to cart clicked:", { userId, productId: id });
      // dispatch thunk and wait for result
      await dispatch(addToCart({ userId, productId: Number(id ?? product?.id ?? 0), quantity: 1 })).unwrap();

      // success UI (same message style)
      const title = product?.name ?? "Product";
      setSuccessMessage(`${title} has been added to your cart.`);
      setShowSuccess(true);
    } catch (err: any) {
      console.error("[ProductDetail] addToCart failed:", err);
      setSuccessMessage("Failed to add to cart.");
      setShowSuccess(true);
    }
  }

  // Shop Now: add then navigate to /cart (wait for add to complete)
  async function handleShopNow() {
    try {
      await handleAddToCart();
      // small delay so user sees success briefly before redirecting (optional)
      setTimeout(() => navigate("/cart"), 250);
    } catch {
      // if add failed, handleAddToCart already shows failure message
    }
  }

  // Close handler for success popup
  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSuccessMessage(undefined);
  };

  const featuresFromDescription = (txt?: string) => {
    if (!txt) return [];
    const parts = txt
      .split(/[\.\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 3)
      .slice(0, 8);
    return parts;
  };

  if (!id) return <div className="p-8">Invalid product id</div>;

  return (
    <div className="min-h-screen p-6 bg-black06 text-white 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header: title + buttons */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-4xl font-[var(--second-font)] tracking-wide">
              {product?.name ?? "Product"}
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              {product?.description
                ? product.description.slice(0, 120) +
                (product.description.length > 120 ? "..." : "")
                : "-"}
            </p>
            <div className="mt-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${(product?.stock ?? 0) > 0
                    ? "bg-black15 text-white"
                    : "bg-red-700 text-white"
                  }`}
              >
                {(product?.stock ?? 0) > 0 ? "In stock" : "Out of stock"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-md border border-dashed bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.06)]"
            >
              Add To Cart
            </button>

            <button
              onClick={handleShopNow}
              className="px-4 py-2 rounded-md bg-[#d6c6b5] text-black font-medium hover:brightness-95"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* ===== Single Image Area ===== */}
        <section className="border border-dashed border-black15 rounded-xl p-6 mb-6">
          <div className="rounded-lg overflow-hidden border">
            {loading ? (
              <div className="w-full h-[480px] flex items-center justify-center">
                Loading image...
              </div>
            ) : (
              <img
                src={mainImg ?? "/assets/imgs/default-product.jpg"}
                alt={product?.name}
                className="w-full h-[480px] object-cover"
              />
            )}
          </div>
        </section>

        {/* Details area: Description & Features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Materials / Care / Description */}
          <div className="border border-dashed border-black15 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              Materials, Care and origin
            </h2>
            <div className="text-sm text-gray-300">
              {product?.description ? (
                <>
                  <p className="mb-3">{product.description}</p>
                  <p className="text-xs text-gray-400">
                    Created at:{" "}
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </>
              ) : (
                <p className="text-gray-400">No description available.</p>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="border border-dashed border-black15 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
              {featuresFromDescription(product?.description).length > 0 ? (
                featuresFromDescription(product?.description).map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))
              ) : (
                <>
                  <li>High quality materials</li>
                  <li>Designed for comfort and style</li>
                  <li>Easy care and durable</li>
                </>
              )}
            </ul>
          </div>
        </section>
      </div>

      {/* Success popup - same component & behavior as ProductComponent */}
      <SuccessMessage
        isVisible={showSuccess}
        onClose={handleSuccessClose}
        title={successMessage ? (successMessage.includes("Failed") ? "Error" : "Added to cart") : "Added to cart"}
        message={successMessage}
        autoClose={true}
        autoCloseDelay={3500}
      />
    </div>
  );
}
