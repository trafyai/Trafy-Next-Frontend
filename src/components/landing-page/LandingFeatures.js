import React from 'react'
import { LandingFeaturesData } from '@api/landing/LandingData'

const LandingFeatures = () => {
  return (
    <div className="landing-features-section">
        <div className='landing-features-container'>
        {LandingFeaturesData.map((item, index) => (
        <div className='landing-features-box' key={index}>
            <div className='landing-features-box-top'>
            <p>{item.top}</p>
            </div>
            <div className='landing-features-box-bottom'>
            <p>{item.bottom}</p>
            </div>
        </div>
        ))}
        </div>
    </div>
  )
}

export default LandingFeatures