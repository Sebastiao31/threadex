import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Threads } from '@/types/index'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { allThreads } from '@/constants'
import { getStatusColor, getStatusText } from '@/lib/utils'

  interface ThreadsTableProps {
    threads: Threads[]
    classNames?: string
  }

const ThreadsTable = ({threads, classNames}: ThreadsTableProps) => {
  return (
    <article>

        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="text-md w-full text-gray-300">All Threads</TableHead>
                <TableHead className='text-md pr-8 text-gray-300'>Status</TableHead>
                <TableHead className='text-md pr-8 text-gray-300'>Last Edit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {allThreads?.map(({id, name, status, lastEdit}) => (
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
                            <Ellipsis/>
                        </TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
        </Table>
    </article>
  )
}

export default ThreadsTable