
import ContactInfoComponent from "../../components/ContactInfoComponent/ContactInfoComponent";
import ContactSection from "../../components/ContactSection/ContactSection";
import ReusableSectionTwo from "../../components/ReusableSection";
import FAQComponent from "../../components/shared/FAQ/FAQSection";
import TestimonialSection from "../../components/shared/Testimonials/TestimonialsSection";
import { policiesData } from "../../Data/PoliciesData";

const Contact = () => {
  return (
    <>
      <ContactInfoComponent />

      {/* عرض كل سياسة باستخدام ReusableSectionTwo */}
      {policiesData.map((policy, index) => (
        <ReusableSectionTwo
          key={index}
          title={policy.title}
          btn={policy.btn}
        >
          {policy.children}
        </ReusableSectionTwo>
      ))}

      <FAQComponent />
      <TestimonialSection />
      <ContactSection />
    </>
  );
};

export default Contact;

