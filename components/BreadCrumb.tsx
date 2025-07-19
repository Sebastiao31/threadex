'use client'

import React, { useState, useEffect } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { getThreadById } from '@/lib/utils'

interface BreadCrumbProps {
  threadId?: string
}

const BreadCrumb = ({ threadId }: BreadCrumbProps) => {
  const [threadName, setThreadName] = useState<string>('Loading...')

  useEffect(() => {
    const fetchThreadName = async () => {
      if (!threadId) return

      // Check Supabase for thread
      const storedThread = await getThreadById(threadId)
      if (storedThread) {
        setThreadName(storedThread.name)
      } else {
        setThreadName('Thread Not Found')
      }
    }

    fetchThreadName()
  }, [threadId])
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/threads" className='text-md font-regular'>Threads</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        <BreadcrumbItem>
          <BreadcrumbPage className='text-md font-medium'>
            {threadName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumb