import CreateThreadBTN from '@/components/CreateThreadBTN'
import React from 'react'

const ThreadsPage = () => {
  return (
    <div className='flex flex-col h-full mt-2 max-w-7xl mx-auto md:mt-6'>
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
            <h2 className='text-md font-medium'>
                All Threads
            </h2>
        </div>
        <div>
            user threads
            {/* User Threads */}
        </div>
    </div>
  )
}

export default ThreadsPage