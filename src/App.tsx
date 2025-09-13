import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import TrendsSectionComponent from "./components/TrendsSectionComponent/TrendsSectionComponent";

// صفحات إضافية (ممكن تعمل ملفات منفصلة لكل صفحة)


import Login from './pages/Login'
import Register from "./pages/Register";


const App = () => {
  return (
    <div className="bg-black06 min-h-screen">
      <Navbar />

      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<TrendsSectionComponent />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;

