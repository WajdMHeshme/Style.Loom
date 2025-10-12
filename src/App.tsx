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
import { setAuthToken } from "./api/axios";
import { decodeJwtPayload } from "./utils/jwt";
import { useAppDispatch } from "./redux/store/hooks";
import { setUser } from "./redux/slices/authSlice";

const App: React.FC = () => {
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [authReady, setAuthReady] = useState<boolean>(false); // NEW: indicates we've restored auth (or decided there's none)
  const firstLoad = useRef<boolean>(true);
  const location = useLocation();
  const dispatch = useAppDispatch();

  // hide layout for auth routes
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  // --- Initialize auth on app start ---
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // set axios auth header for all subsequent requests
          setAuthToken(token);

          // try to decode token to get a user id (fast, offline)
          const payload = decodeJwtPayload(token);
          const id = payload?.id ?? payload?.userId ?? payload?.sub;
          const firstName = payload?.first_name || payload?.name || payload?.username;

          if (id) {
            // dispatch setUser so store is populated before routes render
            dispatch(setUser({ id: Number(id), firstName: firstName ?? undefined, token }));
          } else {
            // إذا التوكن لا يحتوي id، نكتفي بضبط الهيدر؛ يمكنك هنا استدعاء /auth/me إذا متوفر
            // مثال (غير مفعل): const me = await api.get('/auth/me');
            // dispatch(setUser({ id: me.data.id, firstName: me.data.first_name, token }));
          }
        }
      } catch (e) {
        console.error("Auth init failed:", e);
        // clean up on error
        setAuthToken(null);
        localStorage.removeItem("token");
      } finally {
        setAuthReady(true);
      }
    })();
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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

  // If auth not yet ready, show main loader (so Cart won't render empty on refresh)
  if (!authReady) {
    return (
      <div className="bg-black06 min-h-screen relative">
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <MainLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black06 min-h-screen relative">
      {/* MainLoader أول مرة */}
      {firstLoading && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <MainLoader />
        </div>
      )}

      <ScrollToTop />

      <div className={`${firstLoading || loading ? "pointer-events-none select-none blur-sm" : ""}`}>
        {!hideLayout && <Navbar />}

        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />

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

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>

        {!hideLayout && <Footer />}
      </div>

      {!firstLoading && loading && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center">
          <Loader size="w-12 h-12" center={true} />
        </div>
      )}
    </div>
  );
};

export default App;
