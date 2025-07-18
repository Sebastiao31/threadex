import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { allThreads } from '@/constants'

interface BreadCrumbProps {
  threadId?: string
}

const BreadCrumb = ({ threadId }: BreadCrumbProps) => {
  // Find the current thread by ID
  const currentThread = threadId ? allThreads.find(thread => thread.id.toString() === threadId) : null
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/threads" className='text-md font-regular'>Threads</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbPage className='text-md font-medium'>
            {currentThread ? currentThread.name : 'Thread Not Found'}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb