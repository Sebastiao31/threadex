'use client'

import React from 'react'
import LogoBadge from '@/components/LogoBadge'
import ThreadGeneratorForm from '@/components/ThreadGeneratorForm'
import { useAuth } from '@/lib/AuthProvider'

const DashboardPage = () => {
  const { user } = useAuth()
  
  // Get username from Twitter metadata or fallback to email
  const displayName = user?.user_metadata?.name || 
                     'user'

  return (
    <div className='flex flex-col items-center justify-center h-full pb-54'>
        <div className='mb-6'>
            <LogoBadge/>
        </div>
        <div className=' mb-12'>
            <h1 className='text-2xl font-bold text-center mb-2'>Hello, {displayName} 👋🏼</h1>
            <p className='text-sm text-gray-500 text-center'>What thread do you want to create today?</p>
        </div>
        <div className=''>
            <ThreadGeneratorForm/>
        </div>
    </div>
  )
}

export default DashboardPage