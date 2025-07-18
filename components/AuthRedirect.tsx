'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthProvider'

export default function AuthRedirect() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're not loading and user is authenticated
    if (!loading && user) {
      console.log('Client-side redirect: User is authenticated, redirecting to dashboard')
      router.push('/dashboard')
    }
  }, [user, loading, router])

  // Don't render anything
  return null
} 