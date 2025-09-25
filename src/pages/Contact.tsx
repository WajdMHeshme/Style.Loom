import ContactInfoComponent from "../components/ContactInfoComponent/ContactInfoComponent";
import FAQComponent from "../components/FAQ/FAQSection";
import TestimonialSection from "../components/Testimonials/TestimonialsSection";
import ContactSection from "../components/ContactSection/ContactSection";
import ReusableSectionTwo from "../components/ReusableSection"; // تأكد من المسار
import { policiesData } from "../Data/PoliciesData"; // تأكد من مسار الداتا

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

