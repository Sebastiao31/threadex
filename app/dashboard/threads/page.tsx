'use client'

import CreateThreadBTN from '@/components/CreateThreadBTN'
import ThreadsTable from '@/components/ThreadsTable'
import React, { useState, useEffect } from 'react'

import { getUserThreads } from '@/lib/utils'
import { ThreadDisplay } from '@/types'

const ThreadsPage = () => {
  const [threads, setThreads] = useState<ThreadDisplay[]>([])
  const [loading, setLoading] = useState(true)

  const loadThreads = async () => {
    try {
      setLoading(true)
      const userThreads = await getUserThreads()
      setThreads(userThreads)
    } catch (error) {
      console.error('Error loading threads:', error)
      // Set empty array if there's an error
      setThreads([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadThreads()

    // Listen for custom events when threads are added/deleted
    const handleThreadAdded = () => {
      loadThreads()
    }
    
    const handleThreadDeleted = () => {
      loadThreads()
    }
    
    window.addEventListener('threadAdded', handleThreadAdded)
    window.addEventListener('threadDeleted', handleThreadDeleted)

    return () => {
      window.removeEventListener('threadAdded', handleThreadAdded)
      window.removeEventListener('threadDeleted', handleThreadDeleted)
    }
  }, [])

  if (loading) {
    return (
      <div className='flex flex-col h-full mt-2 max-w-4xl mx-auto md:mt-6'>
        <div className='space-y-2'>
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse max-w-xs"></div>
        </div>
        <div className='my-8 max-w-[30%] space-y-4'>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {Array.from({length: 3}).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full mt-2 max-w-4xl  mb-[140px] mx-auto md:mt-6'>
        <div className='space-y-2'>
            <h1 className='text-2xl font-bold'>Your Threads</h1>
            <p className='text-sm text-gray-500'>Manage your threads here</p>
        </div>

        <div className='my-8 max-w-[30%] space-y-4 '>
            <h2 className='text-md font-medium'>
                Create Thread
            </h2>
            <CreateThreadBTN variant='pagevariant'/>
        </div>

        <div>
            <ThreadsTable
                classNames='w-full  '
                threads={threads}
            />
        </div>
    </div>
  )
}

export default ThreadsPage