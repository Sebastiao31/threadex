'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Copy, Check, Edit2, Calendar, Share2 } from 'lucide-react'
import BreadCrumb from '@/components/BreadCrumb'
import { getThreadById, formatTimeAgo } from '@/lib/utils'
import { Thread } from '@/types'

const ThreadEditor = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const [thread, setThread] = useState<Thread | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchThread = async () => {
      setLoading(true)
      
      // Get thread from Supabase
      const foundThread = await getThreadById(params.id)
      setThread(foundThread)
      
      setLoading(false)
    }

    fetchThread()
  }, [params.id])

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
    <main className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className='max-md:hidden mb-4'>
          <BreadCrumb threadId={params.id}/>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push('/dashboard/threads')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Threads
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={copyAllTweets}
              className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {copiedIndex === -1 ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                  Copied All
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </>
              )}
            </button>
            
            <button className="inline-flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </button>
            
            <button className="inline-flex items-center px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>
        </div>

        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{thread.name}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Style: {thread.writing_style}</span>
            <span>•</span>
            <span>{thread.tweets.length} tweets</span>
            <span>•</span>
            <span>Created {formatTimeAgo(thread.created_at)}</span>
            <span>•</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {thread.status}
            </span>
          </div>
        </div>
      </div>

      {/* Thread Content */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Thread Content</h2>
          <span className="text-sm text-gray-500">{thread.tweets.length} tweets</span>
        </div>

        {thread.tweets.map((tweet, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-medium text-gray-700">Tweet {index + 1}</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{tweet.length}/280</span>
                <button
                  onClick={() => copyToClipboard(tweet, index)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Copy tweet"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{tweet}</p>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">💡 Publishing Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Copy each tweet individually and post them in sequence</li>
          <li>• Add the 🧵 emoji to your first tweet to indicate it's a thread</li>
          <li>• Wait a few seconds between each tweet to ensure proper threading</li>
          <li>• Consider scheduling your thread for optimal engagement times</li>
        </ul>
      </div>
    </main>
  )
}

export default ThreadEditor