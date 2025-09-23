import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

import Loader from "./utils/Loader";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const firstLoad = useRef<boolean>(true);
  const location = useLocation();
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      firstLoad.current = false;
    }, 1600);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (firstLoad.current) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <div className="bg-black06 min-h-screen relative">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <Loader size="w-20 h-20" center={true} />
        </div>
      )}

      <div
        className={`${
          loading ? "pointer-events-none select-none blur-sm" : ""
        }`}
      >
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
};

export default App;
