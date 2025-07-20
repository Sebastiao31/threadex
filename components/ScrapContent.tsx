import React from 'react'
import { ScanSearch } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const ScrapContent = () => {
  return (  
<main className='flex justify-center items-center'>
    <Tooltip>
        <TooltipTrigger>
            <div className='hover:bg-[#1d9bf0]/5 rounded-md p-1.5 cursor-pointer'>
                <ScanSearch className='w-5 h-5 text-[#1d9bf0]' />
            </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>Scrap Content</p>
        </TooltipContent>
    </Tooltip>
</main>
  )
}

export default ScrapContent