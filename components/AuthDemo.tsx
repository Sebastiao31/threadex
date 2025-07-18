'use client'

import React from 'react'
import { useAuth } from '@/lib/AuthProvider'
import TwitterSignInButton from './TwitterSignInButton'

const AuthDemo = () => {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
            {user.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Avatar"
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <span className="text-gray-500 text-2xl">👤</span>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Welcome!</h3>
            <p className="text-gray-600">@{user.user_metadata?.user_name || 'Unknown'}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={() => signOut()}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-md mx-auto text-center space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Sign in to continue</h3>
        <p className="text-gray-600 text-sm mb-4">Connect your Twitter account to get started</p>
      </div>
      
      <TwitterSignInButton className="w-full" />
    </div>
  )
}

export default AuthDemo 