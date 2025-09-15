import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    // simulate login API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black06 p-6">
      <div className="w-full max-w-md pt-27">
        <div className="bg-gradient-to-br from-black06/60 to-[#111111]/60 p-8 rounded-2xl shadow-2xl border border-[#222]">
          <div className="mb-6 text-center">
            <div className="mx-auto w-16 h-16  flex items-center justify-center">
              <img src="/Clippathgroup.svg" alt="icon" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-white">Sign In</h1>
            <p className="mt-1 text-sm text-brown60">
              Welcome back — please log in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-400 bg-[#2b1510] p-2 rounded">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label
                className="block text-sm mb-2 text-brown60"
                htmlFor="email"
              >
                Email
              </label>
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-brown60" htmlFor="password">
                  Password
                </label>
                <a href="" className="text-xs text-brown60 hover:text-white">
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#121212] text-white placeholder-[#7e7e7e] outline-none border border-[#1e1e1e] focus:border-[#ae9b84] focus:ring-2 focus:ring-brown60/20 transition pr-10"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#cfc6bb] hover:text-[#ae9b84]"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-brown60">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded border-[#2b2b2b] bg-[#121212] text-brown60 focus:ring-brown60/50"
                />
                <span className="ml-2">Remember me</span>
              </label>
            </div>

            {/* Submit */}
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



            {/* Register link */}
            <div className="text-center mt-2 text-sm text-[#cfc6bb]">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-brown60 hover:underline"
              >
                Register now
              </Link>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#7a7470]">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-brown60">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-brown60">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
