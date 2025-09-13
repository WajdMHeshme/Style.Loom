import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TrendsSectionComponent from "./components/TrendsSectionComponent/TrendsSectionComponent";
import StepsComponent from "./components/StepsComponent/StepsComponent";

// صفحات تسجيل الدخول والتسجيل
import Login from './pages/Login';
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="bg-black06 min-h-screen">
      <Navbar />

      {/* المكونات الرئيسية */}
      <TrendsSectionComponent />
      <StepsComponent />

      {/* الراوتينغ */}
      <Routes>
        <Route path="/" element={<TrendsSectionComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
