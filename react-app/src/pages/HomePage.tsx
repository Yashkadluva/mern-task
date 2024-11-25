import FooterSection from "../components/FooterSection/FooterSection"
import HowItWorks from "../components/HowItWorks/HowItWorks"
import LoginHeader from "../components/LoginHeader/LoginHeader"
import PopularDesign from "../components/PopularDesign/PopularDesign"
import PricingPlan from "../components/PricingPlan/PricingPlan"
import ReviewSection from "../components/Review/ReviewSection"
import SectionView from "../components/SectionView/SectionView"

const HomePage = () => {

    return (
        <>
            <LoginHeader />
            <ReviewSection />
            <SectionView />
            <PopularDesign />
            <HowItWorks />
            <PricingPlan />
            <FooterSection />
        </>
    )
}

export default HomePage