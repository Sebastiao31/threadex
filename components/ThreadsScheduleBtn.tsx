import React from 'react'
import { ClockIcon } from 'lucide-react'

const ThreadsScheduleBtn = () => {
  return (
    <main>
        <div className='px-4 py-2 border border-gray-200 text-black rounded-full hover:bg-gray-100 cursor-pointer flex items-center gap-2'>
            <ClockIcon className='w-4 h-4' />
            <p className='text-sm font-medium'>Schedule</p>
        </div>
    </main>
  )
}

export default ThreadsScheduleBtn