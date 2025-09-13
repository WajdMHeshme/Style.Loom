import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

// صفحات
import TrendsSectionComponent from "./components/TrendsSectionComponent/TrendsSectionComponent";
import StepsComponent from "./components/StepsComponent/StepsComponent";
import Login from './pages/Login';
import Register from "./pages/Register";

const App = () => {
  return (
    <div className="bg-black06 min-h-screen">
      <Navbar />

      {/* الراوتينغ */}
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route
          path="/"
          element={
            <>
              <TrendsSectionComponent />
              <StepsComponent />
            </>
          }
        />

        {/* صفحات الـ Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;

