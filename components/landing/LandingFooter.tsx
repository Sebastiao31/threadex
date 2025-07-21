import React from 'react'
import Link from 'next/link'
import LogoBadge from '../LogoBadge'

const LandingFooter = () => {
  return (
    <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <LogoBadge />
              <span className="text-xl font-bold text-gray-900">ThreadEx</span>
            </div>
            <p className="text-gray-500 text-center md:text-left max-w-md">
              AI-powered Twitter thread generator that helps you create viral content and grow your following.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-gray-900 text-center md:text-left">Product</h4>
              <Link href="/features" className="text-gray-500 hover:text-gray-900 transition-colors text-center md:text-left">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-500 hover:text-gray-900 transition-colors text-center md:text-left">
                Pricing
              </Link>
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-900 transition-colors text-center md:text-left">
                Dashboard
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-gray-900 text-center md:text-left">Company</h4>
              <Link href="/about" className="text-gray-500 hover:text-gray-900 transition-colors text-center md:text-left">
                About
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900 transition-colors text-center md:text-left">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900 transition-colors text-center md:text-left">
                Privacy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-gray-200 gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 ThreadEx. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <Link href="/terms" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter 