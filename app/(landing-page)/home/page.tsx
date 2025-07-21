import React from 'react'
import LandingHero from '@/components/landing/LandingHero'
import LandingFeatures from '@/components/landing/LandingFeatures'
import LandingHowItWorks from '@/components/landing/LandingHowItWorks'
import LandingTestimonials from '@/components/landing/LandingTestimonials'
import LandingCTA from '@/components/landing/LandingCTA'
import LandingFooter from '@/components/landing/LandingFooter'

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingTestimonials />
      <LandingCTA />
      <LandingFooter />
    </main>
  )
}

export default HomePage