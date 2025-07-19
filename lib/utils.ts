import { statusColors, statusText } from "@/constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getStatusColor = (status: string) => {
  return statusColors[status as keyof typeof statusColors];
}

export const getStatusText = (status: string) => {
  return statusText[status as keyof typeof statusText];
}

export function validateTweet(tweet: string): string {
  // Remove extra whitespace and ensure proper formatting
  const cleaned = tweet.trim()
  
  // Ensure tweet doesn't exceed 280 characters
  if (cleaned.length > 280) {
    return cleaned.substring(0, 277) + "..."
  }
  
  return cleaned
}

export function processTweets(tweets: string[], length: number): string[] {
  return tweets
    .filter((tweet: string) => tweet && tweet.length > 0)
    .slice(0, length + 1)
    .map((tweet: string) => validateTweet(tweet))
}

import { createClient } from '@supabase/supabase-js'
import { Thread, ThreadDisplay } from '@/types'

// Initialize Supabase client for client-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Thread database utilities
export async function saveThread(threadData: Partial<Thread>): Promise<Thread | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const thread = {
      user_id: user.id,
      name: threadData.name || '',
      topic: threadData.topic || '',
      writing_style: threadData.writing_style || 'informative',
      thread_length: threadData.thread_length || 7,
      tweets: threadData.tweets || [],
      status: threadData.status || 'Not Scheduled' as const
    }

    const { data, error } = await supabase
      .from('threads')
      .insert([thread])
      .select()
      .single()

    if (error) {
      console.error('Error saving thread:', error)
      throw error
    }

    // Dispatch custom event to notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('threadAdded'))
    }

    return data
  } catch (error) {
    console.error('Error in saveThread:', error)
    return null
  }
}

export async function getUserThreads(): Promise<ThreadDisplay[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return []
    }

    const { data, error } = await supabase
      .from('threads')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching threads:', error)
      return []
    }

    // Transform to display format
    return data.map((thread: Thread) => ({
      id: thread.id,
      name: thread.name,
      status: thread.status,
      lastEdit: formatTimeAgo(thread.updated_at)
    }))
  } catch (error) {
    console.error('Error in getUserThreads:', error)
    return []
  }
}

export async function getThreadById(id: string): Promise<Thread | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return null
    }

    const { data, error } = await supabase
      .from('threads')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching thread:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getThreadById:', error)
    return null
  }
}

export async function updateThread(id: string, updates: Partial<Thread>): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return false
    }

    const { error } = await supabase
      .from('threads')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error updating thread:', error)
      return false
    }

    // Dispatch custom event to notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('threadUpdated'))
    }

    return true
  } catch (error) {
    console.error('Error in updateThread:', error)
    return false
  }
}

export async function updateThreadStatus(id: string, status: Thread['status']): Promise<boolean> {
  return updateThread(id, { status })
}

export async function deleteThread(id: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return false
    }

    const { error } = await supabase
      .from('threads')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting thread:', error)
      return false
    }

    // Dispatch custom event to notify other components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('threadDeleted'))
    }

    return true
  } catch (error) {
    console.error('Error in deleteThread:', error)
    return false
  }
}

export function formatTimeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
  return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
}

