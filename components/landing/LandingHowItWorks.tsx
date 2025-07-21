import React from 'react'
import { MessageSquare, Sparkles, Share2 } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    title: 'Enter Your Topic',
    description: 'Simply describe what you want to write about. Our AI understands any topic or niche.',
    step: '01'
  },
  {
    icon: Sparkles,
    title: 'AI Creates Your Thread',
    description: 'Watch as AI generates a compelling thread tailored to your style and audience in seconds.',
    step: '02'
  },
  {
    icon: Share2,
    title: 'Publish & Grow',
    description: 'Review, edit if needed, and publish directly to Twitter. Watch your engagement soar.',
    step: '03'
  }
]

const LandingHowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Three steps to viral content
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Creating engaging Twitter threads has never been this simple
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-black text-white text-sm font-bold px-3 py-1 rounded-full">
                  {step.step}
                </span>
              </div>

              {/* Icon */}
              <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6 mt-4">
                <step.icon className="w-8 h-8 text-gray-700" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed">
                {step.description}
              </p>

              {/* Connection Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 right-0 w-full h-0.5 bg-gray-200 transform translate-x-1/2 translate-y-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingHowItWorks 