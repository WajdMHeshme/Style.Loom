import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Favourite from "./pages/Favourite";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Loader from "./utils/Loader";
import MainLoader from "./utils/mainLoader/MainLoader"; // اللودر الأساسي
import ProductDetail from "./pages/ProductsDetail";

const App: React.FC = () => {
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const firstLoad = useRef<boolean>(true);
  const location = useLocation();

  // MainLoader عند أول تحميل الصفحة
  useEffect(() => {
    const t = setTimeout(() => {
      setFirstLoading(false);
      firstLoad.current = false;
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  // Loader عند التنقل بين الراوتات + ScrollToTop
  useEffect(() => {
    if (firstLoad.current) return;

    setLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 400);

    return () => clearTimeout(t);
  }, [location]);

  return (
    <div className="bg-black06 min-h-screen relative">
      {/* MainLoader أول مرة */}
      {firstLoading && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <MainLoader />
        </div>
      )}

      <ScrollToTop />

      {/* المحتوى */}
      <div
        className={`${
          firstLoading || loading ? "pointer-events-none select-none blur-sm" : ""
        }`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<Favourite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>

      {/* Loader عند التنقل بين الراوتات */}
      {!firstLoading && loading && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
          <Loader size="w-12 h-12" center={true} />
        </div>
      )}
    </div>
  );
};

export default App;
