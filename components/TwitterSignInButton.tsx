'use client'

import React, { useState } from 'react'
import { signInWithTwitter } from '@/lib/auth'

interface TwitterSignInButtonProps {
  className?: string
  children?: React.ReactNode
}

const TwitterSignInButton = ({ className = '', children }: TwitterSignInButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithTwitter()
      if (result.error) {
        alert('Failed to sign in with Twitter. Please try again.')
      }
    } catch (error) {
      console.error('Sign in error:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Signing in...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          {children || 'Sign in with Twitter'}
        </>
      )}
    </button>
  )
}

export default TwitterSignInButton 