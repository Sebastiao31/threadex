import React from 'react'
import LogoBadge from '../LogoBadge'
import TwitterSignInButton from '../TwitterSignInButton'
import { Sparkles, ArrowRight } from 'lucide-react'
import TwitterSignIn from '../TwitterSignIn'

const LandingHero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <LogoBadge />
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Create Viral 
            <span className="block text-black">Twitter Threads</span>
            <span className="block text-gray-600">with AI</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Generate engaging, professional Twitter threads that grow your audience. 
            Write once, post everywhere, and watch your followers multiply.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <TwitterSignInButton className="w-full sm:w-auto px-8 py-4 text-lg">
            
            Start Creating Threads
          </TwitterSignInButton>
          
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors group">
            See How It Works
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div>
        <TwitterSignIn/>
        </div>

        {/* Social Proof */}
        <div className="pt-12 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4">Trusted by content creators worldwide</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-medium text-gray-500">500+ Threads Created</div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="text-sm font-medium text-gray-500">10k+ Followers Gained</div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="text-sm font-medium text-gray-500">95% Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingHero 