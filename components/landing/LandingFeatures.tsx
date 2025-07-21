import React from 'react'
import { Sparkles, Clock, Target, BarChart3, Zap, Shield } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Writing',
    description: 'Generate engaging threads with advanced AI that understands viral content patterns and audience engagement.'
  },
  {
    icon: Clock,
    title: 'Save Hours Daily',
    description: 'Create a week\'s worth of content in minutes. Focus on your business while AI handles the writing.'
  },
  {
    icon: Target,
    title: 'Audience-Focused',
    description: 'Every thread is optimized for engagement, replies, and follower growth using proven content strategies.'
  },
  {
    icon: BarChart3,
    title: 'Performance Tracking',
    description: 'Track your thread performance and understand what content resonates with your audience.'
  },
  {
    icon: Zap,
    title: 'Instant Publishing',
    description: 'Seamlessly publish your threads directly to Twitter with one click. No copy-pasting required.'
  },
  {
    icon: Shield,
    title: 'Brand Consistency',
    description: 'Maintain your unique voice and style across all threads with customizable writing styles.'
  }
]

const LandingFeatures = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to grow on Twitter
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Powerful features designed to help you create viral content and build a loyal following
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-black rounded-lg mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LandingFeatures 