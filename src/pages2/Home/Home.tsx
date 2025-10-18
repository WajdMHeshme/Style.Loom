import ProductsSectionComponent from '../../components/ProductsSectionComponent/ProductsSectionComponent'
import TestimonialSection from '../../components/shared/Testimonials/TestimonialsSection'
import FAQSection from '../../components/shared/FAQ/FAQSection'
import InfoSection from '../../components/InfoSection';
import TrendsSectionComponent from '../../components/HomeComponents/TrendsSectionComponent/TrendsSectionComponent';
import StepsComponent from '../../components/HomeComponents/StepsComponent/StepsComponent';
import MainHero from '../../components/HomeComponents/MainHero';

export default function Home() {
    return (
        <>
            <MainHero />
            <TrendsSectionComponent />
            <StepsComponent />
            <ProductsSectionComponent />
            <TestimonialSection />
            <FAQSection />
            <InfoSection />
        </>
    )
}
