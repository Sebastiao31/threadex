import React from 'react'
import { Trash2 } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const DeleteTweet = () => {
  return (  
<main className='flex justify-center items-center'>
    <Tooltip>
        <TooltipTrigger>
            <div className='hover:bg-red-600/5 rounded-md p-1.5 cursor-pointer'>
                <Trash2 className='w-5 h-5 text-red-600' />
            </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>Delete Tweet</p>
        </TooltipContent>
    </Tooltip>
</main>
  )
}

export default DeleteTweet