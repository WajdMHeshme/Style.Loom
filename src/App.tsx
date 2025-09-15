import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

// صفحات
import TrendsSectionComponent from "./components/TrendsSectionComponent/TrendsSectionComponent";
import StepsComponent from "./components/StepsComponent/StepsComponent";
import MainHero from './components/MainHero';
import Login from './pages/Login';
import Register from "./pages/Register";
import Footer from "./components/Footer/Footer";

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
              <MainHero />
              <TrendsSectionComponent />
              <StepsComponent />
              <Footer />
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

