'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Signout from './Signout'

interface TwitterUser {
  id: string
  twitter_id: string
  screen_name: string
  name: string
  profile_image_url: string
  oauth_token: string
  oauth_token_secret: string
  created_at: string
}

const SideBarFooter = () => {
  const [user, setUser] = useState<TwitterUser | null>(null)
  const [loading, setLoading] = useState(true)
  // State to track if image failed to load - MUST be called before any conditional returns
  const [imageError, setImageError] = useState(false)

  // Helper function to get cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  // Fetch user data from cookies and database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const twitterUserId = getCookie('twitter_user_id');
        
        if (twitterUserId) {
          const { data: twitterUser, error } = await supabase
            .from('twitter_users')
            .select('*')
            .eq('twitter_id', twitterUserId)
            .single();

          if (error) {
            console.error('Error fetching Twitter user:', error);
            setUser(null);
          } else {
            setUser(twitterUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error in fetchUserData:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  // Extract user information from Twitter data
  const displayName = user.name || user.screen_name || 'User'
  const username = user.screen_name || 'unknown'
  const avatarUrl = user.profile_image_url
  
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