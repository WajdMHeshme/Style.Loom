// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAppDispatch } from "../redux/store/hooks";
import { setUser } from "../redux/slices/authSlice";

/** فكّ payload من JWT */
function decodeJwtPayload(token: string) {
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

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";
  const REGISTER_URL = `${API_BASE}/api/auth/register`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) return setError("First name is required");
    if (!lastName.trim()) return setError("Last name is required");
    if (!email.trim()) return setError("Email is required");
    if (!password) return setError("Password is required");

    setLoading(true);

    try {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          password,
        }),
      });

      const resText = await res.text();
      let body: any;
      try {
        body = resText ? JSON.parse(resText) : {};
      } catch {
        body = { message: resText };
      }

      if (!res.ok) {
        const serverMsg = body?.message || body?.error || res.statusText || `Register failed (${res.status})`;
        setError(serverMsg);
        setLoading(false);
        return;
      }

      // التوكن واسم المستخدم و id
      const token = body?.token || body?.accessToken || body?.data?.token;
      const userId = body?.user?.id ?? body?.data?.user?.id ?? (token ? decodeJwtPayload(token)?.id : undefined);
      let userName = body?.user?.first_name || body?.user?.username || body?.first_name || body?.name;

      if (!userName && token) {
        const payload = decodeJwtPayload(token);
        userName = payload?.first_name || payload?.name || payload?.username || null;
      }

      if (token) localStorage.setItem("token", token);
      if (userName) localStorage.setItem("user_name", userName);

      // dispatch to redux
      if (userId) {
        dispatch(setUser({
          id: Number(userId),
          firstName: userName ?? undefined,
          token: token ?? undefined,
        }));
      } else {
        const payload = token ? decodeJwtPayload(token) : null;
        const maybeId = payload?.id || payload?.userId;
        if (maybeId) {
          dispatch(setUser({
            id: Number(maybeId),
            firstName: userName ?? undefined,
            token: token ?? undefined,
          }));
        }
      }

      // مباشرة للـ Products بعد التسجيل
      navigate("/products");
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err?.message || "Network error while registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black06 p-6">
      <div className="w-full max-w-md pt-27">
        <div className="bg-gradient-to-br from-black06/60 to-[#111111]/60 p-8 rounded-2xl shadow-2xl border border-[#222]">
          <div className="mb-6 text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center">
              <img src="/Clippathgroup.svg" alt="icon" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-white">Create Account</h1>
            <p className="mt-1 text-sm text-brown60">Welcome — create your new account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-400 bg-[#2b1510] p-2 rounded">{error}</div>}

            <div>
              <label className="block text-sm mb-2 text-brown60" htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-brown60 focus:ring-2 focus:ring-brown60/20 transition"
                placeholder="Enter your first name"
                autoComplete="given-name"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-brown60" htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-brown60 focus:ring-2 focus:ring-brown60/20 transition"
                placeholder="Enter your last name"
                autoComplete="family-name"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-brown60" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-brown60 focus:ring-2 focus:ring-brown60/20 transition"
                placeholder="example@domain.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-brown60" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-brown60 focus:ring-2 focus:ring-brown60/20 transition pr-10"
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#cfc6bb] hover:text-brown60"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-black font-semibold shadow-sm 
             bg-gradient-to-r from-[#ae9b84] via-[#90715b] to-[#ae9b84]
             bg-[length:300%_100%] bg-left
             transition-all duration-700
             hover:bg-right hover:shadow-xl disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            <div className="text-center mt-2 text-sm text-brown60">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-brown60 hover:underline">Sign in</Link>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#7a7470]">
          By registering, you agree to our{" "}
          <a href="/terms" className="text-brown60">Terms</a> and{" "}
          <a href="/privacy" className="text-brown60">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
