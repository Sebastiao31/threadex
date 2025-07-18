import React from 'react'
import BreadCrumb from '@/components/BreadCrumb'

const ThreadEditor = async ({params}: {params: Promise<{id: string}>}) => {
  const { id } = await params
  
  return (
    <div>
        <BreadCrumb threadId={id}/>
        <h1>Thread Editor</h1>
        <p>Thread ID: {id}</p>
    </div>
  )
}

export default ThreadEditor