import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from './pages/Login';
import Register from "./pages/Register";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div className="bg-black06 min-h-screen">
      <Navbar />

      {/* الراوتينغ */}
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/"element={<Home />}/>
        <Route path="/cart" element={<Cart />} />
        {/* صفحات الـ Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>

  );
};

export default App;

