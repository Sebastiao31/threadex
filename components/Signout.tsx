'use client'

import { LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '@/lib/AuthProvider'
import { useRouter } from 'next/navigation'

const Signout = () => {
  const { signOut } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
      router.push('/home') // Redirect to home page after sign out
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button 
        onClick={handleSignOut}
        disabled={isLoading}
        className='text-red-500 p-1 rounded-md hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
        title="Sign Out"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
        ) : (
          <LogOut/>
        )}
      </button>
    </div>
  )
}

export default Signout