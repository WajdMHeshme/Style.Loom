// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import MainLoader from "./utils/mainLoader/MainLoader";
import ProductDetail from "./pages/ProductsDetail";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./utils/PrivateRoute";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/Privacy";

const App: React.FC = () => {
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const firstLoad = useRef<boolean>(true);
  const location = useLocation();

  // ✅ تحديد إذا كنا في صفحة تسجيل الدخول أو التسجيل
  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        {/* ✅ إظهار Navbar و Footer فقط إذا لم نكن في صفحات Auth */}
        {!hideLayout && <Navbar />}

        <Routes>
          {/* افتراضي: توجه مباشرة لصفحة تسجيل الدخول */}
          <Route path="/" element={<Navigate to="/register" replace />} />

          {/* صفحات محمية */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />

          {/* المسار المفرد المتوافق مع navigate('/product/${id}') */}
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favourite />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />

          {/* صفحات غير محمية */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>

        {!hideLayout && <Footer />}
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


