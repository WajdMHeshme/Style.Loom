import MainHero from '../components/MainHero'
import TrendsSectionComponent from '../components/TrendsSectionComponent/TrendsSectionComponent'
import StepsComponent from '../components/StepsComponent/StepsComponent'
import ProductsSectionComponent from '../components/ProductsSectionComponent/ProductsSectionComponent'
import TestimonialSection from '../components/Testimonials/TestimonialsSection'
import FAQSection from '../components/FAQ/FAQSection'
import InfoSection from '../components/InfoSection';

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
