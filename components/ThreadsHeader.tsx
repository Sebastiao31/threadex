import React from 'react'
import BreadCrumb from './BreadCrumb'
import PostBtn from './PostBtn'
import ThreadsScheduleBtn from './ThreadsScheduleBtn'

const ThreadsHeader = ({params}: {params: {id: string}}) => {
  return (
    <>
      <div>
        <BreadCrumb threadId={params.id}/>
      </div>
      <div className='flex gap-2 items-center'>
        <ThreadsScheduleBtn/>
        <PostBtn/>
      </div>
    </>
  )
}

export default ThreadsHeader