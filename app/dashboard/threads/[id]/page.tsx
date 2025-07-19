'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check, Calendar, Share2, Loader2 } from 'lucide-react'
import BreadCrumb from '@/components/BreadCrumb'
import { getThreadById, formatTimeAgo, updateThread } from '@/lib/utils'
import { Thread } from '@/types'
import { useAuth } from '@/lib/AuthProvider'
import ThreadsToolbar from '@/components/ThreadsToolbar'

const ThreadEditor = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { user } = useAuth()
  const [thread, setThread] = useState<Thread | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [savingIndex, setSavingIndex] = useState<number | null>(null)
  const [savedIndex, setSavedIndex] = useState<number | null>(null)
  const [originalTweets, setOriginalTweets] = useState<string[]>([])
  const [imageError, setImageError] = useState(false)
  const [activeToolbarIndex, setActiveToolbarIndex] = useState<number | null>(null)

  // Extract user information from Twitter metadata (same as SideBarFooter)
  const displayName = user?.user_metadata?.name || user?.user_metadata?.full_name || 'User'
  const username = user?.user_metadata?.user_name || 
                   user?.user_metadata?.preferred_username ||
                   user?.email?.split('@')[0] || 
                   'unknown'
  const avatarUrl = user?.user_metadata?.avatar_url
  const fallbackAvatar = displayName.charAt(0).toUpperCase()
  const showFallback = !avatarUrl || imageError

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false)
  }, [user?.id])

  useEffect(() => {
    const fetchThread = async () => {
      setLoading(true)
      
      // Get thread from Supabase
      const foundThread = await getThreadById(params.id)
      setThread(foundThread)
      
      // Set original tweets for comparison
      if (foundThread) {
        setOriginalTweets([...foundThread.tweets])
      }
      
      setLoading(false)
    }

    fetchThread()
  }, [params.id])

  // Auto-resize all textareas when thread data loads
  useEffect(() => {
    if (thread && !loading) {
      const textareas = document.querySelectorAll('textarea')
      textareas.forEach((textarea) => {
        autoResizeTextarea(textarea as HTMLTextAreaElement)
      })
    }
  }, [thread, loading])

  // Handle clicking outside to hide toolbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Check if click is outside textarea and toolbar areas
      if (!target.closest('textarea') && !target.closest('[data-toolbar]')) {
        setActiveToolbarIndex(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyAllTweets = async () => {
    if (!thread) return
    
    const allTweets = thread.tweets.join('\n\n---\n\n')
    try {
      await navigator.clipboard.writeText(allTweets)
      setCopiedIndex(-1) // Use -1 to indicate all tweets copied
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy all tweets:', err)
    }
  }

  const handleTweetChange = async (index: number, newContent: string) => {
    if (!thread) return

    // Update local state immediately for responsive UI
    const updatedTweets = [...thread.tweets]
    updatedTweets[index] = newContent
    setThread({ ...thread, tweets: updatedTweets })
  }

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto'
    // Set height to scrollHeight to show all content
    const newHeight = Math.max(textarea.scrollHeight, 100) // minimum 100px height
    textarea.style.height = newHeight + 'px'
  }

  const handleTweetBlur = async (index: number, content: string) => {
    if (!thread || content.length > 280) return

    // Don't save if content hasn't changed from the original
    if (content === originalTweets[index]) return

    setSavingIndex(index)
    try {
      // Update thread in database
      const updatedTweets = [...thread.tweets]
      updatedTweets[index] = content
      
      const success = await updateThread(thread.id, { tweets: updatedTweets })

      if (success) {
        // Update original tweets to reflect the saved state
        const newOriginalTweets = [...originalTweets]
        newOriginalTweets[index] = content
        setOriginalTweets(newOriginalTweets)
        
        // Show saved indicator
        setSavedIndex(index)
        setTimeout(() => setSavedIndex(null), 2000)
      } else {
        // Revert local state if save failed
        const revertedTweets = [...thread.tweets]
        revertedTweets[index] = originalTweets[index]
        setThread({ ...thread, tweets: revertedTweets })
        alert('Failed to save tweet. Please try again.')
      }
    } catch (error) {
      console.error('Error saving tweet:', error)
      // Revert to original content on error
      const revertedTweets = [...thread.tweets]
      revertedTweets[index] = originalTweets[index]
      setThread({ ...thread, tweets: revertedTweets })
      alert('An error occurred while saving the tweet.')
    } finally {
      setSavingIndex(null)
    }
  }

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            {Array.from({length: 5}).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  if (!thread) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thread Not Found</h1>
          <p className="text-gray-600 mb-6">The thread you're looking for doesn't exist or has been deleted.</p>
          <button
            onClick={() => router.push('/dashboard/threads')}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Threads
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-6 mb-[240px] max-md:mb-[120px]">
      {/* Header */}
      <div className="mb-18">
        <div className='max-md:hidden mb-4'>
          <BreadCrumb threadId={params.id}/>
        </div>

      </div>

              {/* Thread Content */}
        <div className="max-w-[598px] mx-auto bg-white overflow-hidden mr-[120px]">
        

                          {thread.tweets.map((tweet, index) => (
           <div 
             key={index}
             className="bg-white py-4 px-4 hover:cursor-textmb-4"
           >
             <div className="flex gap-4">
               {/* Left side - Avatar */}
               <div className="flex-shrink-0">
                 <div className="w-10 h-10 rounded-full flex items-center justify-center">
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
               </div>

               {/* Right side - Username and Content */}
               <div className="flex-1 min-w-0">
                 {/* User Info Header */}
                 <div className="flex items-center gap-2 mb-2">
                   <h3 className="font-bold text-gray-900 text-sm">{displayName}</h3>
                   <span className="text-gray-500 text-sm">@{username}</span>
                   
                   {/* Status indicators */}
                   {savingIndex === index && (
                     <span className="text-xs text-blue-600 font-medium flex items-center ml-auto">
                       <Loader2 className="w-3 h-3 animate-spin mr-1" />
                       Saving...
                     </span>
                   )}
                   {savedIndex === index && (
                     <span className="text-xs text-green-600 font-medium flex items-center ml-auto">
                       <Check className="w-3 h-3 mr-1" />
                       Saved!
                     </span>
                   )}
                 </div>
                 
                 {/* Tweet Content */}
                 <div>
                   <textarea
                     value={tweet}
                     onChange={(e) => {
                       handleTweetChange(index, e.target.value)
                       autoResizeTextarea(e.target)
                     }}
                     onFocus={() => {
                       setActiveToolbarIndex(index)
                     }}
                     onBlur={(e) => {
                       handleTweetBlur(index, e.target.value)
                     }}
                     onInput={(e) => autoResizeTextarea(e.target as HTMLTextAreaElement)}
                     className={`w-full resize-none  focus:outline-none overflow-hidden min-h-[80px] leading-relaxed text-gray-900 text-[15px] border-none bg-transparent placeholder-gray-500 ${tweet.length > 280 ? 'text-red-500' : ''}`}
                     style={{ height: 'auto' }}
                     placeholder="What's happening?"
                     disabled={savingIndex === index}
                     ref={(textarea) => {
                       if (textarea) {
                         // Auto-resize on initial render and when content changes
                         setTimeout(() => autoResizeTextarea(textarea), 0)
                       }
                     }}
                   />
                   

                   
                   {/* Threads Toolbar - Show when textarea is focused */}
                   {activeToolbarIndex === index && (
                                            <div 
                         className="mt-3 flex justify-end"
                         data-toolbar
                       >
                         <ThreadsToolbar 
                           tweetNumber={index + 1} 
                           characterCount={tweet.length}
                           currentIndex={index}
                           totalTweets={thread.tweets.length}
                         />
                       </div>
                   )}
                 </div>
               </div>
             </div>
           </div>
         ))}
      </div>

      
    </main>
  )
}

export default ThreadEditor