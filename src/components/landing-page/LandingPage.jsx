import LandingHero from '@components/landing-page/LandingHero';
import LandingCompaniesHired from './LandingCompaniesHired';
import LandingFeatures from './LandingFeatures';
import LandingPathway from './LandingPathway';
import LandingLearning from "@components/landing-page/LandingLearning";
import LandingExplore from "@components/landing-page/LandingExplore";
import LandingOptimised from "@components/landing-page/LandingOptimised";
import LandingReview from "@components/landing-page/LandingReview";
import LandingNewsletter from "@components/landing-page/LandingNewsletter";
import LandingBetterTogether from "@components/landing-page/LandingBetterTogether";
import '@styles/landing-page/LandingPage.css'

export default function landingPage(){
   
    return(
        <>
       
        <LandingHero/>
        {/* <LandingCompaniesHired/> */}
        <LandingFeatures/>
        <LandingPathway/>
        <LandingLearning/>
        <LandingExplore/>
        <LandingOptimised/>
        <LandingBetterTogether/>
        <LandingReview/>
        <LandingNewsletter/>
        </>
    )
}