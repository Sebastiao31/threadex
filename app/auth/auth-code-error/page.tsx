'use client'

import Link from 'next/link'
import React from 'react'
import { useSearchParams } from 'next/navigation'

const AuthCodeErrorPage = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const description = searchParams.get('description')
  
  const isEmailError = error === 'server_error' && description?.includes('email')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className={`w-16 h-16 ${isEmailError ? 'bg-yellow-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <svg className={`w-8 h-8 ${isEmailError ? 'text-yellow-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isEmailError ? 'Email Access Issue' : 'Authentication Error'}
        </h1>
        
        {isEmailError ? (
          <div className="text-left mb-6">
            <p className="text-gray-600 mb-4">
              Twitter couldn't provide your email address. This usually happens when:
            </p>
            <ul className="text-sm text-gray-500 mb-4 space-y-1">
              <li>• Email access isn't enabled in your Twitter app</li>
              <li>• Terms of Service URL is missing</li>
              <li>• Privacy Policy URL is missing</li>
              <li>• Your Twitter account doesn't have a verified email</li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Quick Fix:</strong> Go to your Twitter Developer Portal → App Settings → User authentication settings → Enable "Request email from users"
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Sorry, there was an error processing your Twitter authentication. This could be due to:
            </p>
            <ul className="text-left text-sm text-gray-500 space-y-1">
              <li>• Network connection issues</li>
              <li>• Twitter authentication was cancelled</li>
              <li>• Invalid authentication code</li>
            </ul>
          </div>
        )}
        
        {error && (
          <div className="text-xs text-gray-400 mb-4 p-2 bg-gray-50 rounded">
            Error: {error} - {description}
          </div>
        )}
        
        <div className="space-y-3">
          <Link 
            href="/home"
            className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors inline-block"
          >
            Try Again
          </Link>
          
          <Link 
            href="/"
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-block"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthCodeErrorPage 