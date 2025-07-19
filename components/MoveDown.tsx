import React from 'react'
import { ArrowDown } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const MoveDown = () => {
  return (  
<main className='flex justify-center items-center'>
    <Tooltip>
        <TooltipTrigger>
            <div className='hover:bg-black/5 rounded-md p-1.5 cursor-pointer'>
                <ArrowDown className='w-5 h-5 text-black' />
            </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>Move Down</p>
        </TooltipContent>
    </Tooltip>
</main>
  )
}

export default MoveDown