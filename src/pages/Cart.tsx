// src/components/Cart/Cart.tsx
import { useEffect, useState } from "react";
import { GoX, GoArrowLeft } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { fetchCart, updateCartItem, removeCartItem } from "../redux/slices/cartSlice";

/**
 * Cart (optimistic updates)
 *
 * - Keeps a local copy (localItems) for instant UI updates (optimistic).
 * - Calls thunks to persist changes on the backend.
 * - On failure, refetches server state to rollback and shows console error (you can replace with toast).
 *
 * NOTE:
 * - This component still relies on your cartSlice thunks (updateCartItem/removeCartItem/fetchCart).
 * - Make sure endpoints in cartApi exist as used by the thunks.
 */

type LocalCartItem = {
  id: number;        // cart-item id (unique)
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function Cart() {
  const dispatch = useAppDispatch();
  const userId = Number(localStorage.getItem("userId") || 1);

  // Defensive selector for Redux cart slice
  const cartState = useAppSelector((s: any) => (s && s.cart) || { items: [], totalPrice: 0, loading: false, error: null });
  const { items = [], totalPrice = 0, loading = false, error = null } = cartState;

  // Local UI state for optimistic updates & checkout UI
  const [localItems, setLocalItems] = useState<LocalCartItem[]>([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // Map backend item -> LocalCartItem safely
  const mapItemToLocal = (it: any): LocalCartItem => {
    const prod = it?.product ?? {};
    const rawImage = prod?.imageUrl ?? prod?.img ?? prod?.image ?? "/assets/imgs/default-product.jpg";
    const rawImageStr = typeof rawImage === "string" ? rawImage : String(rawImage);
    const image = rawImageStr.startsWith("http") || rawImageStr.startsWith("data:") ? rawImageStr : `http://localhost:3000${rawImageStr}`;
    return {
      id: it?.id ?? 0,
      name: prod?.name ?? prod?.title ?? "Unknown product",
      price: typeof prod?.price === "number" ? prod.price : Number(prod?.price ?? 0),
      quantity: typeof it?.quantity === "number" ? it.quantity : Number(it?.quantity ?? 1),
      image,
    };
  };

  // Sync localItems whenever store cart items change (this handles server canonical state)
  useEffect(() => {
    try {
      const mapped = Array.isArray(items) ? items.map(mapItemToLocal) : [];
      setLocalItems(mapped);
    } catch (e) {
      console.error("Failed to map cart items:", e);
      setLocalItems([]);
    }
  }, [items]);

  // Initial fetch on mount
  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  // Helper: replace an item in localItems by id
  const replaceLocalItem = (itemId: number, updater: (it: LocalCartItem) => LocalCartItem) => {
    setLocalItems((prev) => prev.map((it) => (it.id === itemId ? updater(it) : it)));
  };

  // Helper: remove local item
  const removeLocalItem = (itemId: number) => {
    setLocalItems((prev) => prev.filter((it) => it.id !== itemId));
  };

  // Increase quantity (optimistic)
  const increaseQuantity = async (itemId: number) => {
    const current = localItems.find((it) => it.id === itemId);
    if (!current) return;

    // optimistic update
    replaceLocalItem(itemId, (it) => ({ ...it, quantity: it.quantity + 1 }));

    try {
      // call backend to update (thunk will refetch on success)
      await dispatch(updateCartItem({ userId, itemId, quantity: current.quantity + 1 })).unwrap();
      // success -> cartSlice's fetchCart will sync and override localItems via effect
    } catch (err) {
      console.error("Failed to increase quantity:", err);
      // rollback by refetching server state
      await dispatch(fetchCart(userId));
    }
  };

  // Decrease quantity (optimistic). If reaches 0 => remove.
  const decreaseQuantity = async (itemId: number) => {
    const current = localItems.find((it) => it.id === itemId);
    if (!current) return;

    // if would remove:
    if (current.quantity - 1 <= 0) {
      // optimistic remove
      const backup = localItems.slice();
      removeLocalItem(itemId);
      try {
        await dispatch(removeCartItem({ userId, itemId })).unwrap();
        // success: server state will be fetched by thunk
      } catch (err) {
        console.error("Failed to remove item:", err);
        // rollback local list
        setLocalItems(backup);
        await dispatch(fetchCart(userId));
      }
      return;
    }

    // optimistic decrement
    replaceLocalItem(itemId, (it) => ({ ...it, quantity: it.quantity - 1 }));

    try {
      await dispatch(updateCartItem({ userId, itemId, quantity: current.quantity - 1 })).unwrap();
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
      // rollback by refetch
      await dispatch(fetchCart(userId));
    }
  };

  // Remove item (optimistic)
  const removeFromCart = async (itemId: number) => {
    const backup = localItems.slice();
    removeLocalItem(itemId);

    try {
      await dispatch(removeCartItem({ userId, itemId })).unwrap();
      // success -> server canonical state will be pulled
    } catch (err) {
      console.error("Failed to remove item:", err);
      // rollback
      setLocalItems(backup);
      await dispatch(fetchCart(userId));
    }
  };

  // computed total from server if available; otherwise from localItems
  const computedTotal =
    typeof totalPrice === "number" && totalPrice > 0
      ? totalPrice.toFixed(2)
      : localItems.reduce((t, it) => t + it.price * it.quantity, 0).toFixed(2);

  const paymentMethods = [
    { id: "visa", name: "Visa", image: "/assets/imgs/checkout/visa.svg" },
    { id: "mastercard", name: "MasterCard", image: "/assets/imgs/checkout/mastercard.svg" },
    { id: "paypal", name: "PayPal", image: "/assets/imgs/checkout/paypal.svg" },
    { id: "applepay", name: "Apple Pay", image: "/assets/imgs/checkout/applepay.svg" },
  ];

  return (
    <div className="w-full bg-neutral-950 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px] min-h-screen">
      <div className="border-2 border-dashed border-neutral-700 rounded-2xl p-6 max-w-5xl mx-auto">
        {loading && <div className="text-center text-white py-6">Loading cart...</div>}
        {error && <div className="text-center text-red-400 py-6">{String(error)}</div>}

        {localItems.length > 0 ? (
          localItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b-2 border-dashed border-neutral-700 py-6"
            >
              <div className="flex items-center gap-6 w-full">
                <img src={item.image} alt={item.name} className="w-40 rounded-xl" />
                <div className="flex flex-col gap-2">
                  <h4 className="text-white text-2xl font-medium">{item.name}</h4>
                  <p className="text-gray-400 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-4 text-white">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="border border-neutral-700 w-8 h-8 rounded-full flex items-center justify-center"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="border border-neutral-700 w-8 h-8 rounded-full flex items-center justify-center"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button className="text-red-500 text-4xl" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>
                <GoX />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-2xl text-white py-12">Your shopping cart is empty 🛒</p>
        )}

        {localItems.length > 0 && (
          <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
            <h3 className="text-white text-xl">Total: ${computedTotal}</h3>
            <button className="bg-brown60 text-black px-6 py-3 rounded-xl font-medium" onClick={() => setOpenPopUp(true)}>
              Checkout
            </button>
          </div>
        )}
      </div>

      {openPopUp && (
        <div className="pt-[150px] fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-2xl p-8 w-full max-w-lg relative">
            <button className="absolute top-4 left-4 text-white text-2xl" onClick={() => setOpenPopUp(false)}>
              <GoArrowLeft />
            </button>

            <h2 className="text-white text-2xl mb-4 text-center">Checkout</h2>

            <label className="text-white text-lg">Name</label>
            <input type="text" placeholder="Enter your name" className="w-full mt-2 mb-4 px-4 py-2 rounded-lg bg-neutral-800 text-white outline-none" />

            <h3 className="text-white text-lg mb-2">Choose Payment Method</h3>
            <div className="flex gap-4 mb-4 flex-wrap">
              {paymentMethods.map((method) => (
                <button key={method.id} onClick={() => setSelectedPayment(method.image)} className={`p-2 rounded-lg border ${selectedPayment === method.image ? "border-yellow-600" : "border-transparent"} bg-neutral-800`}>
                  <img src={method.image} alt={method.name} className="w-12 h-8" />
                </button>
              ))}
            </div>

            <div className="relative mb-4">
              <input type="text" placeholder="Card Number" className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white outline-none" />
              {selectedPayment && <img src={selectedPayment} alt="Payment Logo" className="absolute right-4 top-1 w-8" />}
            </div>

            <div className="flex gap-4 mb-6">
              <input type="text" placeholder="CVV" maxLength={3} className="w-1/2 px-4 py-2 rounded-lg bg-neutral-800 text-white outline-none" />
              <input type="text" placeholder="MM/YY" maxLength={5} className="w-1/2 px-4 py-2 rounded-lg bg-neutral-800 text-white outline-none" />
            </div>

            <button
              className="w-full bg-yellow-700 text-white py-3 rounded-xl font-medium"
              onClick={() => {
                // close popup; real checkout flow should call payment gateway / create order endpoint
                setOpenPopUp(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
