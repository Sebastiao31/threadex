import React from 'react'
import { ImagePlus } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const AddMedia = () => {
  return (  
<main className='flex justify-center items-center'>
    <Tooltip>
        <TooltipTrigger>
            <div className='hover:bg-[#1d9bf0]/5 rounded-md p-1.5 cursor-pointer'>
                <ImagePlus className='w-5 h-5 text-[#1d9bf0]' />
            </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>Add Media</p>
        </TooltipContent>
    </Tooltip>
</main>
  )
}

export default AddMedia