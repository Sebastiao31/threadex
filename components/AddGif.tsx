import React from 'react'
import { Gif } from "@phosphor-icons/react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const AddGif = () => {
  return (  
<main className='flex justify-center items-center'>
    <Tooltip>
        <TooltipTrigger>
            <div className='hover:bg-[#1d9bf0]/5 rounded-md p-1.5 cursor-pointer'>
                <Gif size={26} className='text-[#1d9bf0]' />
            </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>Add GIF</p>
        </TooltipContent>
    </Tooltip>
</main>
  )
}

export default AddGif