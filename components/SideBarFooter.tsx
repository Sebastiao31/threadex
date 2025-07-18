'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthProvider'
import Signout from './Signout'

const SideBarFooter = () => {
  const { user, loading } = useAuth()
  // State to track if image failed to load - MUST be called before any conditional returns
  const [imageError, setImageError] = useState(false)

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false)
  }, [user?.id])

  if (loading) {
    return (
      <div className="flex flex-row items-center justify-between space-x-2">
        <div className="flex items-center space-x-3 py-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        </div>
        <div>
          <Signout/>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-row items-center justify-between space-x-2">
        <div className="flex items-center space-x-3 py-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
            ?
          </div>
          <div className="flex-1">
            <p className="text-md font-medium text-gray-600">Not signed in</p>
            <p className="text-sm text-gray-400">@guest</p>
          </div>
        </div>
        <div>
          <Signout/>
        </div>
      </div>
    )
  }

  // Extract user information from Twitter metadata
  const displayName = user.user_metadata?.name || user.user_metadata?.full_name || 'User'
  const username = user.user_metadata?.user_name || 
                   user.user_metadata?.preferred_username ||
                   user.email?.split('@')[0] || 
                   'unknown'
  const avatarUrl = user.user_metadata?.avatar_url
  
  // Create fallback avatar with first letter of display name
  const fallbackAvatar = displayName.charAt(0).toUpperCase()
  
  const showFallback = !avatarUrl || imageError

  return (
    <div>
      <div className="flex flex-row items-center justify-between space-x-2">
        <div className="flex items-center space-x-3 py-2 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
            {!showFallback ? (
              <img 
                src={avatarUrl} 
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {fallbackAvatar}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-md font-medium text-gray-900 truncate">{displayName}</p>
            <p className="text-sm text-gray-500 truncate">@{username}</p>
          </div>
        </div>

        <div className="flex-shrink-0">
          <Signout/>
        </div>
      </div>
    </div>
  )
}

export default SideBarFooter