import React from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahbuilds",
    avatar: "SC",
    text: "ThreadEx helped me grow from 500 to 10k followers in just 3 months. The AI-generated threads consistently get high engagement!",
    followers: "10.2K followers"
  },
  {
    name: "Marcus Rodriguez",
    handle: "@marketingmarc",
    avatar: "MR", 
    text: "I was spending hours writing threads. Now I create a week's worth of content in 30 minutes. Game changer for content creators.",
    followers: "25.8K followers"
  },
  {
    name: "Emily Johnson",
    handle: "@techwriter_em",
    avatar: "EJ",
    text: "The writing styles feature is incredible. Each thread sounds authentically like my voice while being perfectly optimized for engagement.",
    followers: "8.7K followers"
  }
]

const LandingTestimonials = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by content creators
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            See how ThreadEx is helping creators build their audience and grow their influence
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-lg border border-gray-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.handle}</div>
                  <div className="text-xs text-gray-400">{testimonial.followers}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Join thousands of successful creators</p>
          <div className="flex justify-center items-center gap-4">
            <div className="flex -space-x-2">
              {['AB', 'CD', 'EF', 'GH', 'IJ'].map((initials, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500">+2,847 creators growing with ThreadEx</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingTestimonials 