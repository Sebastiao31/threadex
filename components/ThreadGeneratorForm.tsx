'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { saveThread } from '@/lib/utils'
import { Thread } from '@/types'
import { useAuth } from '@/lib/AuthProvider'

const ThreadGeneratorForm = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [threadLength, setThreadLength] = useState([7])
  const [writingStyle, setWritingStyle] = useState('')
  const [topic, setTopic] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Extract username from user metadata (same logic as SideBarFooter)
  const username = user?.user_metadata?.user_name || 
                   user?.user_metadata?.preferred_username ||
                   user?.email?.split('@')[0] || 
                   'yourhandle'

  const writingStyles = [
    { value: 'casual', label: 'Casual' },
    { value: 'professional', label: 'Professional' },
    { value: 'informative', label: 'Informative' },
    { value: 'entertaining', label: 'Entertaining' },
    { value: 'educational', label: 'Educational' },
    { value: 'motivational', label: 'Motivational' }
  ]

  const handleGenerateThread = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for your thread')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate-thread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic.trim(),
          writingStyle,
          threadLength: threadLength[0],
          username: username
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate thread')
      }

      if (data.success && data.tweets) {
        // Create a new thread object
        const threadData = {
          name: topic.trim(),
          topic: topic.trim(),
          writing_style: writingStyle || 'informative',
          thread_length: threadLength[0],
          tweets: data.tweets,
          status: 'Not Scheduled' as const
        }

        // Save the thread to Supabase
        const savedThread = await saveThread(threadData)

        if (savedThread) {
          // Redirect to the thread detail page
          router.push(`/dashboard/threads/${savedThread.id}`)
        } else {
          throw new Error('Failed to save thread to database')
        }
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl  mx-auto bg-white rounded-xl border border-gray-200 p-2  ">
      {/* Text Area */}
      <div className="mb-2">
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
          placeholder="e.g. 'How to become a better man' or 'Top 10 Most deadliest animals in the world'"
          rows={4}
          disabled={isLoading}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between space-x-2 md:space-x-4">
        {/* Writing Style Select */}
        <div className="min-w-[120px] md:min-w-[160px] ">
          <Select value={writingStyle} onValueChange={setWritingStyle} disabled={isLoading}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Writing Style" />
            </SelectTrigger>
            <SelectContent>
              {writingStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Thread Length Slider */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-500 md:inline whitespace-nowrap">Content Items:</label>
          <div className="flex items-center space-x-3">
            <Slider
              value={threadLength}
              onValueChange={setThreadLength}
              max={10}
              min={5}
              step={1}
              className="w-20 md:w-24"
              disabled={isLoading}
            />
            <span className="text-black font-medium min-w-[20px] whitespace-nowrap">{threadLength[0]}</span>
          </div>
        </div>

        {/* Generate Thread Button */}
        <button 
          onClick={handleGenerateThread}
          disabled={isLoading || !topic.trim()}
          className="flex items-center space-x-0 bg-black text-white p-3 rounded-full font-medium hover:bg-gray-900 transition-colors cursor-pointer lg:px-4 lg:space-x-2 lg:py-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 lg:w-4 lg:h-4 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 lg:w-4 lg:h-4" />
          )}
          <span className='text-sm hidden lg:inline'>
            {isLoading ? 'Generating...' : 'Generate Thread'}
          </span>
        </button>
      </div>
    </div>
  )
}

export default ThreadGeneratorForm