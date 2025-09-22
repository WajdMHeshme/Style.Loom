import ProductsSectionComponent from "../components/ProductsSectionComponent/ProductsSectionComponent";
import FAQSection from "../components/FAQ/FAQSection";
import InfoSection from "../components/InfoSection";
import TestimonialSection from "../components/Testimonials/TestimonialsSection";
const Products = () => {
  return (
    <>
    <ProductsSectionComponent />
      <TestimonialSection />
      <FAQSection />
      <InfoSection />
    </>
  );
};

export default Products;
