import React from 'react'
import TwitterSignInButton from '../TwitterSignInButton'
import { Sparkles, CheckCircle } from 'lucide-react'

const benefits = [
  'Generate unlimited threads',
  'Multiple writing styles',
  'Direct Twitter publishing',
  'Performance analytics',
  'No monthly fees'
]

const LandingCTA = () => {
  return (
    <section className="py-24 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA Content */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to grow your
            <span className="block text-gray-300">Twitter following?</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of creators who are already using ThreadEx to build their audience and grow their influence.
          </p>

          {/* Benefits List */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 py-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <TwitterSignInButton className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg">
              <Sparkles className="w-5 h-5" />
              Start Creating for Free
            </TwitterSignInButton>
          </div>

          {/* Small print */}
          <p className="text-sm text-gray-400 pt-4">
            Free to start • No credit card required • Connect with Twitter in seconds
          </p>
        </div>
      </div>
    </section>
  )
}

export default LandingCTA 