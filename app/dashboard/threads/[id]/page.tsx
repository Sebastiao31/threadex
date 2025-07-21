'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check, Calendar, Share2, Loader2 } from 'lucide-react'
import BreadCrumb from '@/components/BreadCrumb'
import { getThreadById, formatTimeAgo, updateThread } from '@/lib/utils'
import { Thread, TweetData } from '@/types'
import { useAuth } from '@/lib/AuthProvider'
import ThreadsToolbar from '@/components/ThreadsToolbar'
import ThreadsHeader from '@/components/ThreadsHeader'

const ThreadEditor = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { user } = useAuth()
  const [thread, setThread] = useState<Thread | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [savingIndex, setSavingIndex] = useState<number | null>(null)
  const [savedIndex, setSavedIndex] = useState<number | null>(null)
  const [originalTweets, setOriginalTweets] = useState<(string | TweetData)[]>([])
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

  // Helper functions to handle mixed tweet data
  const getTweetText = (tweet: string | TweetData): string => {
    return typeof tweet === 'string' ? tweet : tweet.text
  }

  const getTweetImage = (tweet: string | TweetData) => {
    return typeof tweet === 'string' ? null : tweet.image
  }

  const createTweetData = (text: string, image?: { url: string; prompt?: string }): TweetData => {
    return { text, ...(image && { image }) }
  }

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
    const currentTweet = updatedTweets[index]
    
    // Preserve image if it exists, just update text
    if (typeof currentTweet === 'object' && currentTweet.image) {
      updatedTweets[index] = { ...currentTweet, text: newContent }
    } else {
      updatedTweets[index] = newContent
    }
    
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

    const originalText = getTweetText(originalTweets[index])
    // Don't save if content hasn't changed from the original
    if (content === originalText) return

    setSavingIndex(index)
    try {
      // Update thread in database
      const updatedTweets = [...thread.tweets]
      const currentTweet = updatedTweets[index]
      
      // Preserve image if it exists, just update text
      if (typeof currentTweet === 'object' && currentTweet.image) {
        updatedTweets[index] = { ...currentTweet, text: content }
      } else {
        updatedTweets[index] = content
      }
      
      const success = await updateThread(thread.id, { tweets: updatedTweets })

      if (success) {
        // Update original tweets to reflect the saved state
        const newOriginalTweets = [...originalTweets]
        newOriginalTweets[index] = updatedTweets[index]
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

  const handleDeleteTweet = async (index: number) => {
    if (!thread || thread.tweets.length <= 1) return

    setSavingIndex(index)
    try {
      // Create new tweets array without the deleted tweet
      const updatedTweets = thread.tweets.filter((_, i) => i !== index)
      
      const success = await updateThread(thread.id, { tweets: updatedTweets })

      if (success) {
        // Update local state
        setThread({ ...thread, tweets: updatedTweets })
        
        // Update original tweets array
        const newOriginalTweets = originalTweets.filter((_, i) => i !== index)
        setOriginalTweets(newOriginalTweets)
        
        // Hide toolbar if it was active for the deleted tweet
        setActiveToolbarIndex(null)
        
        // Show success message briefly
        setSavedIndex(index)
        setTimeout(() => setSavedIndex(null), 2000)
      } else {
        alert('Failed to delete tweet. Please try again.')
      }
    } catch (error) {
      console.error('Error deleting tweet:', error)
      alert('An error occurred while deleting the tweet.')
    } finally {
      setSavingIndex(null)
    }
  }

  const handleMoveUp = async (index: number) => {
    if (!thread || index === 0) return

    setSavingIndex(index)
    try {
      // Create new tweets array with swapped positions
      const updatedTweets = [...thread.tweets]
      const temp = updatedTweets[index]
      updatedTweets[index] = updatedTweets[index - 1]
      updatedTweets[index - 1] = temp
      
      const success = await updateThread(thread.id, { tweets: updatedTweets })

      if (success) {
        // Update local state
        setThread({ ...thread, tweets: updatedTweets })
        
        // Update original tweets array
        const newOriginalTweets = [...originalTweets]
        const tempOriginal = newOriginalTweets[index]
        newOriginalTweets[index] = newOriginalTweets[index - 1]
        newOriginalTweets[index - 1] = tempOriginal
        setOriginalTweets(newOriginalTweets)
        
        // Update active toolbar index to follow the moved tweet
        if (activeToolbarIndex === index) {
          setActiveToolbarIndex(index - 1)
        } else if (activeToolbarIndex === index - 1) {
          setActiveToolbarIndex(index)
        }
        
        // Show success message briefly
        setSavedIndex(index - 1)
        setTimeout(() => setSavedIndex(null), 1000)
      } else {
        alert('Failed to move tweet. Please try again.')
      }
    } catch (error) {
      console.error('Error moving tweet:', error)
      alert('An error occurred while moving the tweet.')
    } finally {
      setSavingIndex(null)
    }
  }

  const handleMoveDown = async (index: number) => {
    if (!thread || index === thread.tweets.length - 1) return

    setSavingIndex(index)
    try {
      // Create new tweets array with swapped positions
      const updatedTweets = [...thread.tweets]
      const temp = updatedTweets[index]
      updatedTweets[index] = updatedTweets[index + 1]
      updatedTweets[index + 1] = temp
      
      const success = await updateThread(thread.id, { tweets: updatedTweets })

      if (success) {
        // Update local state
        setThread({ ...thread, tweets: updatedTweets })
        
        // Update original tweets array
        const newOriginalTweets = [...originalTweets]
        const tempOriginal = newOriginalTweets[index]
        newOriginalTweets[index] = newOriginalTweets[index + 1]
        newOriginalTweets[index + 1] = tempOriginal
        setOriginalTweets(newOriginalTweets)
        
        // Update active toolbar index to follow the moved tweet
        if (activeToolbarIndex === index) {
          setActiveToolbarIndex(index + 1)
        } else if (activeToolbarIndex === index + 1) {
          setActiveToolbarIndex(index)
        }
        
        // Show success message briefly
        setSavedIndex(index + 1)
        setTimeout(() => setSavedIndex(null), 1000)
      } else {
        alert('Failed to move tweet. Please try again.')
      }
    } catch (error) {
      console.error('Error moving tweet:', error)
      alert('An error occurred while moving the tweet.')
    } finally {
      setSavingIndex(null)
    }
  }

  const handleAddTweet = async (afterIndex: number) => {
    if (!thread) return

    setSavingIndex(afterIndex)
    try {
      // Create new tweets array with empty tweet inserted after the specified index
      const updatedTweets = [...thread.tweets]
      const newTweetIndex = afterIndex + 1
      updatedTweets.splice(newTweetIndex, 0, '') // Insert empty string at the new position
      
      const success = await updateThread(thread.id, { tweets: updatedTweets })

      if (success) {
        // Update local state
        setThread({ ...thread, tweets: updatedTweets })
        
        // Update original tweets array
        const newOriginalTweets = [...originalTweets]
        newOriginalTweets.splice(newTweetIndex, 0, '') // Insert empty string at the new position
        setOriginalTweets(newOriginalTweets)
        
        // Set active toolbar to the new tweet and focus it
        setActiveToolbarIndex(newTweetIndex)
        
        // Focus the new tweet textarea after a short delay to ensure it's rendered
        setTimeout(() => {
          const newTextarea = document.querySelector(`textarea[data-tweet-index="${newTweetIndex}"]`) as HTMLTextAreaElement
          if (newTextarea) {
            newTextarea.focus()
          }
        }, 100)
        
        // Show success message briefly
        setSavedIndex(newTweetIndex)
        setTimeout(() => setSavedIndex(null), 1000)
      } else {
        alert('Failed to add tweet. Please try again.')
      }
    } catch (error) {
      console.error('Error adding tweet:', error)
      alert('An error occurred while adding the tweet.')
    } finally {
      setSavingIndex(null)
    }
  }

  const handleImageGenerated = async (index: number, imageData: { url: string; prompt?: string }) => {
    if (!thread) return

    setSavingIndex(index)
    try {
      const updatedTweets = [...thread.tweets]
      const currentTweet = updatedTweets[index]
      const currentText = getTweetText(currentTweet)
      
      // Create new tweet data with image
      const newTweetData = createTweetData(currentText, {
        url: imageData.url,
        prompt: imageData.prompt
      })
      
      updatedTweets[index] = newTweetData
      
      const success = await updateThread(thread.id, { tweets: updatedTweets })

      if (success) {
        // Update local state
        setThread({ ...thread, tweets: updatedTweets })
        
        // Update original tweets array
        const newOriginalTweets = [...originalTweets]
        newOriginalTweets[index] = newTweetData
        setOriginalTweets(newOriginalTweets)
        
        // Show success message briefly
        setSavedIndex(index)
        setTimeout(() => setSavedIndex(null), 2000)
      } else {
        alert('Failed to save image. Please try again.')
      }
    } catch (error) {
      console.error('Error saving image:', error)
      alert('An error occurred while saving the image.')
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
        

      </div>

              {/* Thread Content */}
        <div className="max-w-[598px] mx-auto bg-white overflow-block mr-[120px]">
        

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
                     value={getTweetText(tweet)}
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
                     className={`w-full resize-none  focus:outline-none overflow-hidden min-h-[80px] leading-relaxed text-gray-900 text-[15px] border-none bg-transparent placeholder-gray-500 ${getTweetText(tweet).length > 280 ? 'text-red-500' : ''}`}
                     style={{ height: 'auto' }}
                     placeholder="What's happening?"
                     disabled={savingIndex === index}
                     data-tweet-index={index}
                     ref={(textarea) => {
                       if (textarea) {
                         // Auto-resize on initial render and when content changes
                         setTimeout(() => autoResizeTextarea(textarea), 0)
                       }
                     }}
                   />
                   
                   {/* Generated Image Display */}
                   {getTweetImage(tweet) && (
                     <div className="mt-3">
                       <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                         <img 
                           src={getTweetImage(tweet)!.url}
                           alt="Generated image"
                           className="w-full h-auto max-h-96 object-cover"
                           onError={(e) => {
                             console.error('Error loading generated image')
                             e.currentTarget.style.display = 'none'
                           }}
                         />
                         <div className="absolute top-2 right-2 flex gap-2">
                           <button
                             onClick={() => {
                               // Remove image by converting TweetData back to string
                               const updatedTweets = [...thread!.tweets]
                               updatedTweets[index] = getTweetText(tweet)
                               updateThread(thread!.id, { tweets: updatedTweets })
                               setThread({ ...thread!, tweets: updatedTweets })
                             }}
                             className="bg-red-600/80 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md transition-colors"
                             title="Remove image"
                           >
                             ✕
                           </button>
                           <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                             AI Generated
                           </div>
                         </div>
                       </div>
                       {getTweetImage(tweet)!.prompt && (
                         <p className="text-xs text-gray-500 mt-1 italic">
                           Prompt: {getTweetImage(tweet)!.prompt}
                         </p>
                       )}
                     </div>
                   )}

                   {/* Threads Toolbar - Show when textarea is focused */}
                   {activeToolbarIndex === index && (
                                            <div 
                         className="mt-3 flex justify-end"
                         data-toolbar
                       >
                         <ThreadsToolbar 
                           tweetNumber={index + 1} 
                           characterCount={getTweetText(tweet).length}
                           currentIndex={index}
                           totalTweets={thread.tweets.length}
                           tweetContent={getTweetText(tweet)}
                           threadTopic={thread.topic}
                           onDeleteTweet={handleDeleteTweet}
                           onMoveUp={handleMoveUp}
                           onMoveDown={handleMoveDown}
                           onAddTweet={handleAddTweet}
                           onImageGenerated={handleImageGenerated}
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