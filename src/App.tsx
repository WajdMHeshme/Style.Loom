// src/App.tsx
import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Navbar from "./components/shared/Navbar/Navbar";
import Login from "./pages2/Auth/Login";
import Register from "./pages2/Auth/Register";
import Footer from "./components/shared/Footer/Footer";
import Home from "./pages2/Home/Home";
import Products from "./pages2/Product/Products";
import Favourite from "./pages2/Favourite/Favourite";
import Cart from "./pages2/Cart/Cart";
import Contact from "./pages2/Contact/Contact";
import Loader from "./utils/Loader";
import MainLoader from "./utils/mainLoader/MainLoader";
import ProductDetail from "./pages2/Product/ProductsDetails";
import ProfilePage from "./pages2/Profile/ProfilePage";
import PrivateRoute from "./utils/PrivateRoute";
import Terms from "./pages2/Legal/Terms";
import PrivacyPolicy from "./pages2/Legal/Privacy";
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
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          setAuthToken(token);
          const payload = decodeJwtPayload(token);
          const id = payload?.id ?? payload?.userId ?? payload?.sub;
          const firstName = payload?.first_name || payload?.name || payload?.username;

          if (id) {
            dispatch(setUser({ id: Number(id), firstName: firstName ?? undefined, token }));
          } else {
          }
        }
      } catch (e) {
        console.error("Auth init failed:", e);
        setAuthToken(null);
        localStorage.removeItem("token");
      } finally {
        setAuthReady(true);
      }
    })();
  }, [dispatch]);
  useEffect(() => {
    const t = setTimeout(() => {
      setFirstLoading(false);
      firstLoad.current = false;
    }, 4000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (firstLoad.current) return;

    setLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 400);

    return () => clearTimeout(t);
  }, [location]);
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
