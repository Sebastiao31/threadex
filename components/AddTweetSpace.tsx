import React from 'react'
import { BetweenHorizontalStart } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const AddTweetSpace = () => {
  return (  
<main className='flex justify-center items-center'>
    <Tooltip>
        <TooltipTrigger>
            <div className='hover:bg-[#1d9bf0]/5 rounded-md p-1.5 cursor-pointer'>
                <BetweenHorizontalStart className='w-5 h-5 text-[#1d9bf0]' />
            </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>Add Tweet Space</p>
        </TooltipContent>
    </Tooltip>
</main>
  )
}

export default AddTweetSpace