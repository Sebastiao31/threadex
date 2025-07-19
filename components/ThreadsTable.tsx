'use client'

import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Ellipsis, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { getStatusColor, getStatusText, deleteThread } from '@/lib/utils'

  interface ThreadsTableProps {
    threads: any[]
    classNames?: string
  }

const ThreadsTable = ({threads, classNames}: ThreadsTableProps) => {
  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null)

  const handleDeleteThread = async (threadId: string) => {
    if (confirm('Are you sure you want to delete this thread? This action cannot be undone.')) {
      setDeletingThreadId(threadId)
      
      try {
        const success = await deleteThread(threadId)
        if (success) {
          // The thread will be removed from the list automatically due to the event listener in the parent component
        } else {
          alert('Failed to delete thread. Please try again.')
        }
      } catch (error) {
        console.error('Error deleting thread:', error)
        alert('An error occurred while deleting the thread.')
      } finally {
        setDeletingThreadId(null)
      }
    }
  }

  const handleActionSelect = (action: string, threadId: string) => {
    if (action === 'delete') {
      handleDeleteThread(threadId)
    }
    // Reset the select value after action
    // Note: The select will automatically reset due to key prop
  }

  return (
    <article>

        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="text-md w-full text-gray-300">All Threads</TableHead>
                <TableHead className='text-md pr-8 text-gray-300'>Status</TableHead>
                <TableHead className='text-md pr-8 text-gray-300'>Last Edit</TableHead>
                <TableHead className='text-md pr-8 text-gray-300 w-10'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {threads?.map(({id, name, status, lastEdit}: any) => (
                    <TableRow key={id}>
                        <TableCell className='font-medium text-lg'>
                            <Link href={`/dashboard/threads/${id}`} className='items-center'>
                            <h2 className='text-md font-medium max-md:max-w-[250px] truncate max-sm:max-w-[100px]'>
                                {name}
                            </h2>
                            </Link>
                        </TableCell>


                        <TableCell>
                            <div className="flex justify-left">
                                <div className='inline-block px-3 py-1 rounded-md text-center' style={{backgroundColor: getStatusColor(status)}}>
                                    <p className='text-sm whitespace-nowrap' style={{color: getStatusText(status)}}>
                                        {status}</p>
                                </div>
                            </div>
                        </TableCell>


                        <TableCell>
                            {lastEdit}
                        </TableCell>

                        <TableCell>
                            <Select 
                              key={`${id}-${deletingThreadId}`} 
                              onValueChange={(action) => handleActionSelect(action, id)}
                              disabled={deletingThreadId === id}
                            >
                              <SelectTrigger className="w-10 h-8 p-0 border-none shadow-none hover:bg-gray-100 transition-colors">
                                <div className="flex items-center justify-center w-full">
                                  {deletingThreadId === id ? (
                                    <Loader2 className="h-4 w-4 text-gray-500 animate-spin" />
                                  ) : (
                                    <Ellipsis className="h-4 w-4 text-gray-500" />
                                  )}
                                </div>
                              </SelectTrigger>
                              <SelectContent align="end" className="min-w-[160px]">
                                <SelectItem 
                                  value="delete"
                                  className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                                >
                                  <div className="flex items-center space-x-2">
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete Thread</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
        </Table>
    </article>
  )
}

export default ThreadsTable