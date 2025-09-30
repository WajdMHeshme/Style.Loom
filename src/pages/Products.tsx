import { useEffect, useState } from "react";
import ProductsSectionComponent from "../components/ProductsSectionComponent/ProductsSectionComponent";
import FAQSection from "../components/FAQ/FAQSection";
import InfoSection from "../components/InfoSection";
import TestimonialSection from "../components/Testimonials/TestimonialsSection";
import SuccessMessage from "../utils/SuccessMessageLogin";

const Products = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("showLoginPopup") === "true") {
      setShowPopup(true);
      localStorage.removeItem("showLoginPopup");
    }
  }, []);

  const handleClosePopup = () => setShowPopup(false);

  return (
    <>
      <SuccessMessage
        isVisible={showPopup}
        onClose={handleClosePopup}
        title="Welcome Back!"
        message="You have successfully logged in. Enjoy your shopping!"
        autoClose={true}
        autoCloseDelay={4000}
      />

      <ProductsSectionComponent />
      <TestimonialSection />
      <FAQSection />
      <InfoSection />
    </>
  );
};

export default Products;
