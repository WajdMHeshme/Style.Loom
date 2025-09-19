import MainHero from '../components/MainHero'
import TrendsSectionComponent from '../components/TrendsSectionComponent/TrendsSectionComponent'
import StepsComponent from '../components/StepsComponent/StepsComponent'
import ProductsSectionComponent from '../components/ProductsSectionComponent/ProductsSectionComponent'
import TestimonialSection from '../components/Testimonials/TestimonialsSection'

export default function Home() {
    return (
        <>
            <MainHero />
            <TrendsSectionComponent />
            <StepsComponent />
            <ProductsSectionComponent />
            <TestimonialSection />
        </>
    )
}
