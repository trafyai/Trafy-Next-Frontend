
import Link from "next/link";
import Image from "next/image";
import HeroImg from '@public/assets/Images/landing-page/hero/hero-img.png'
import Group from '@public/assets/Images/landing-page/hero/Group.png'


const LandingHero = () => {
   

    return (
        <main>
            {/* <div className="landing-hero-section">
                <div className="landing-hero-container">
                    <div className="landing-hero-heading">
                        <h1>Learn how to build and use AI across industries</h1>
                    </div>
                    <div className="landing-hero-paragraph">
                        <p>trafy is collective education program that helps, guides, and educates students, and professionals to learn to build and use AI in their domain.</p>
                    </div>
                    <div className="landing-hero-buttons">
                        <Link className="landing-hero-explore-btn" href="/courses">Explore Courses</Link>
                        <a className="landing-hero-join-btn" href="https://discord.gg/uKgUAwbe" target="_blank" rel="noopener noreferrer">Join Discussions</a>
                    </div>
                </div>
            </div> */}


           <div className="landing-hero-section">
            <div className="landing-hero-container">
                <div className="landing-hero-left-cont">
                    <div className="landing-hero-heading">
                        <h1>Become your Industry’s G.O.A.T</h1>
                    </div>
                    <div className="landing-hero-paragraph">
                        <p>Become an expert by learning modern trends and technologies of industries like Artificial Intelligence, Data Science, Programming, Design, Sales, and Marketing.</p>
                    </div>
                    <div className="landing-hero-buttons">
                        <Link className="landing-hero-explore-btn" href="/courses">Explore Pathways <Image src={Group} style={{marginLeft:"8px"}} width="12" height="13" /></Link>
                    </div>
                </div>
                <div className="landing-hero-right-cont">
                    <div className="landing-hero-img-container">
                        <Image src={HeroImg} className="landing-hero-img"/>
                    </div>
                    <div className="landing-hero-image-description">
                        <p>1:1 Doubt clearing sessions</p>
                        <p>AI Job Curation Assistance</p>
                    </div>
                </div>
            </div>
           </div>

        </main>
    )
}

export default LandingHero;
