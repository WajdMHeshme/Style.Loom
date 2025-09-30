// src/pages/ProfilePage.tsx
import  { useEffect, useState, useCallback, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../components/UserAvatar";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // لإظهار النجوم

type UserData = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  orders?: any[];
  rating?: number; // إضافة التقييم
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading profile...</div>
      </div>
    );
  }

  const renderStars = (rating: number = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <AiFillStar key={i} className="text-yellow-400 inline" /> : <AiOutlineStar key={i} className="text-yellow-400 inline" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen p-6 bg-black06">
      <div className="max-w-3xl mx-auto mt-[220px]">
        <div className="bg-[color:var(--color-black05)] p-6 rounded-2xl border border-[color:var(--color-black15)]">
          <div className="flex items-center gap-6">
            <UserAvatar size={96} />
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {user?.first_name || ""} {user?.last_name || ""}
              </h2>
              {user?.email && <div className="text-sm text-gray-300 mt-1">{user.email}</div>}
              {user?.role && <div className="text-xs text-gray-400 mt-2">Role: {user.role}</div>}
              <div className="text-xs text-gray-400 mt-1">
                Purchased products: {user?.orders?.length || 0}
              </div>
              <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                Rating: {renderStars(user?.rating || 0)}
              </div>
            </div>
          </div>

          <hr className="my-6 border-dashed border-[color:var(--color-black15)]" />

          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="px-5 py-3 border rounded-lg text-white hover:bg-gray-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-[#cfc6bb]">
          Shop comfortably with <span className="font-semibold text-brown60">Style.loom</span>
        </p>
      </div>
    </div>
  );
}
