'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthProvider'
import LogoBadge from '@/components/LogoBadge'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to dashboard
        console.log('User authenticated, redirecting to dashboard')
        router.push('/dashboard')
      } else {
        // User is not authenticated, redirect to home page
        console.log('User not authenticated, redirecting to home')
        router.push('/home')
      }
    }
  }, [user, loading, router])

  // Show loading screen while checking session
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <LogoBadge />
        </div>

        {/* Loading Animation */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">ThreadEx</h1>
            <p className="text-gray-500">Loading your experience...</p>
          </div>
        </div>

        {/* Loading dots animation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
