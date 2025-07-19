import React from 'react'
import { ArrowUp } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const MoveUp = () => {
  return (  
<main className='flex justify-center items-center'>
    <Tooltip>
        <TooltipTrigger>
            <div className='hover:bg-black/5 rounded-md p-1.5 cursor-pointer'>
                <ArrowUp className='w-5 h-5 text-black' />
            </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>Move Up</p>
        </TooltipContent>
    </Tooltip>
</main>
  )
}

export default MoveUp