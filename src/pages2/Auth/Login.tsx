// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAppDispatch } from "../../redux/store/hooks";
import { setUser } from "../../redux/slices/authSlice";

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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000";
  const LOGIN_URL = `${API_BASE}/api/auth/login`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const text = await res.text();
      let body: any;
      try { body = text ? JSON.parse(text) : {}; } catch { body = { message: text }; }

      if (!res.ok) {
        setError(body?.message || "Login failed");
        setLoading(false);
        return;
      }

      const token = body?.token || body?.accessToken || null;
      const userId = body?.user?.id ?? body?.user?.userId ?? (token ? decodeJwtPayload(token)?.id : undefined);
      let userName = body?.user?.first_name || body?.user?.name || null;
      if (!userName && token) {
        const payload = decodeJwtPayload(token);
        userName = payload?.first_name || payload?.name || null;
      }
      if (token) {
        if (remember) localStorage.setItem("token", token);
        else sessionStorage.setItem("token", token);
      }
      if (userName) localStorage.setItem("user_name", userName);
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

      // تخزين علامة البوب آب ثم التوجه
      localStorage.setItem("showLoginPopup", "true");
      navigate("/products");
    } catch (err: any) {
      setError(err?.message || "Network error");
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
            <h1 className="mt-4 text-2xl font-semibold text-white">Sign In</h1>
            <p className="mt-1 text-sm text-brown60">Welcome back — please log in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-400 bg-[#2b1510] p-2 rounded">{error}</div>}

            <div>
              <label className="block text-sm mb-2 text-brown60" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-brown60 focus:ring-2 focus:ring-brown60/20 transition"
                placeholder="example@domain.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-brown60" htmlFor="password">Password</label>
                <a href="#" className="text-xs text-brown60 hover:text-white">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-[#ae9b84] focus:ring-2 focus:ring-brown60/20 transition pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#cfc6bb] hover:text-[#ae9b84]"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-brown60">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="form-checkbox h-4 w-4 rounded border-[#2b2b2b] bg-[#121212] text-brown60 focus:ring-brown60/50"
                />
                <span className="ml-2">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-black font-semibold shadow-sm 
             bg-gradient-to-r from-[#d4b78a] via-[#a67c52] to-[#d4b78a]
             bg-[length:300%_100%] bg-left
             transition-all duration-700
             hover:bg-right hover:shadow-xl disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-center mt-2 text-sm text-[#cfc6bb]">
              Don’t have an account?{" "}
              <Link to="/register" className="font-medium text-brown60 hover:underline">Register now</Link>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#7a7470]">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-brown60">Terms</a> and{" "}
          <a href="/privacy" className="text-brown60">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
