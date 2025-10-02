// src/pages/ProfilePage.tsx
import { useEffect, useState, useCallback, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAppSelector } from "../redux/store/hooks";

type UserData = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  orders?: { id?: string | number; total?: number; date?: string; items?: any[] }[];
  rating?: number;
  points?: number;
  avatarUrl?: string;
  createdAt?: string;
  [k: string]: any;
};

function decodeJwtPayload(token: string | null) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";
  const GET_ME = `${API_BASE}/api/auth/me`;

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // try get wishlist length from redux, fallback to localStorage
  let favoritesFromRedux: any[] = [];
  try {
    favoritesFromRedux = useAppSelector((s: any) => s.favorites || []);
  } catch {
    favoritesFromRedux = [];
  }

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchProfile = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(GET_ME, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          signal,
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user_name");
          navigate("/login");
          return;
        }

        const data = await res.json();
        const userObj: UserData = data?.user ? data.user : data;
        userObj.points = userObj.points ?? (userObj.orders ? (userObj.orders.length || 0) * 10 : 0);
        setUser(userObj);
      } catch (err) {
        const payload = decodeJwtPayload(token);
        if (payload) {
          setUser({
            first_name: payload.first_name || payload.name || "",
            last_name: payload.last_name || "",
            email: payload.email || "",
            role: payload.role || "",
            orders: [],
            rating: 0,
            points: 0,
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [GET_ME, token, navigate]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchProfile(controller.signal);
    return () => controller.abort();
  }, [fetchProfile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_name");
    navigate("/login");
  };

  const wishlistCount =
    favoritesFromRedux?.length ??
    (() => {
      try {
        const w = JSON.parse(localStorage.getItem("wishlist") || "[]");
        return Array.isArray(w) ? w.length : 0;
      } catch {
        return 0;
      }
    })();

  const loyaltyPercent = Math.min(100, Math.round(((user?.points ?? 0) / 100) * 100));

  const renderStars = (rating: number = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <AiFillStar key={i} className="text-brown60 inline" />
        ) : (
          <AiOutlineStar key={i} className="text-brown60 inline" />
        )
      );
    }
    return <span className="flex gap-1 items-center">{stars}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black06">
        <div className="text-center text-white/70 animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-black06 to-black04">
      <div className="max-w-4xl mx-auto mt-[140px]">
        <div className="bg-[color:var(--color-black05)] p-6 rounded-2xl border border-[color:var(--color-black15)] shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <div className="flex-shrink-0">
              <div className="w-[96px] h-[96px]">
                <UserAvatar size={96} />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {user?.first_name || ""} {user?.last_name || ""}
                  </h2>
                  {user?.email && <div className="text-sm text-gray-300 mt-1">{user.email}</div>}
                  {user?.role && <div className="text-xs text-gray-400 mt-2">Role: {user.role}</div>}
                  <div className="text-xs text-gray-400 mt-1">
                    Purchased products: <span className="font-medium text-white">{user?.orders?.length || 0}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="text-gray-300">Wishlist:</span>
                    <span className="font-semibold text-white">{wishlistCount}</span>
                    <a href="/favorites" className="ml-3 text-sm px-2 py-1 bg-brown70 text-black06 rounded-full">
                      Open wishlist
                    </a>
                  </div>

                  <div className="mt-3 text-xs text-gray-300 flex items-center gap-2">
                    <span>Rating: </span>
                    {renderStars(user?.rating ?? 0)}
                    <span className="ml-2 text-gray-400">({user?.rating ?? 0}/5)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:brightness-90 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-300">Loyalty</div>
                  <div className="text-xs text-gray-400">{user?.points ?? 0} pts</div>
                </div>
                <div className="w-full bg-white/6 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all"
                    style={{ width: `${loyaltyPercent}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  Level:{" "}
                  <span className="font-semibold text-white">
                    {user?.points && user.points >= 80 ? "VIP" : user?.points && user.points >= 40 ? "Gold" : "Member"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-dashed border-[color:var(--color-black15)]" />

          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex gap-3">
              <a href="/products" className="px-4 py-2 rounded-lg bg-white/6 text-white">
                Continue shopping
              </a>
              <a href="/orders" className="px-4 py-2 rounded-lg border text-white">
                My orders
              </a>
            </div>

            <div className="text-sm text-gray-400">
              Member since: <span className="text-white font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[color:var(--color-black05)] p-4 rounded-2xl border border-[color:var(--color-black15)]">
            <h4 className="text-sm text-gray-300">Account overview</h4>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">Total orders</div>
                <div className="font-semibold text-white">{user?.orders?.length || 0}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">Wishlist</div>
                <div className="font-semibold text-white">{wishlistCount}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-400">Rating</div>
                <div className="font-semibold text-white">{user?.rating ?? 0}/5</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-[color:var(--color-black05)] p-4 rounded-2xl border border-[color:var(--color-black15)]">
            <div className="flex items-center justify-between">
              <h4 className="text-sm text-gray-300">Recent orders</h4>
              <a href="/orders" className="text-xs text-gray-400">View all</a>
            </div>

            <div className="mt-3 space-y-3">
              {(user?.orders && user.orders.length > 0 ? user.orders.slice(0, 3) : []).map((o: any, idx: number) => (
                <div key={o.id ?? idx} className="flex items-center justify-between p-3 bg-white/3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded overflow-hidden flex items-center justify-center text-xs text-gray-300">
                      {o.items && o.items[0] && o.items[0].img ? (
                        <img src={o.items[0].img} alt={o.items[0].title || "item"} className="w-full h-full object-cover" />
                      ) : "IMG"}
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">Order #{o.id ?? "—"}</div>
                      <div className="text-xs text-gray-400">{o.date ? new Date(o.date).toLocaleDateString() : "—"}</div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-300">
                    ${o.total?.toFixed ? o.total.toFixed(2) : (o.total ?? "—")}
                  </div>
                </div>
              ))}

              {(!user?.orders || user.orders.length === 0) && (
                <div className="text-sm text-gray-400 py-4 text-center">No recent orders — start shopping!</div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[#cfc6bb]">
          Shop comfortably with <span className="font-semibold text-brown60">Style.loom</span>
        </p>
      </div>
    </div>
  );
}
