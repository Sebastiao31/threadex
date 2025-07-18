'use client'

import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const ThreadGeneratorForm = () => {
  const [threadLength, setThreadLength] = useState([7])
  const [writingStyle, setWritingStyle] = useState('')

  const writingStyles = [
    { value: 'casual', label: 'Casual' },
    { value: 'professional', label: 'Professional' },
    { value: 'informative', label: 'Informative' },
    { value: 'entertaining', label: 'Entertaining' },
    { value: 'educational', label: 'Educational' },
    { value: 'motivational', label: 'Motivational' }
  ]

  return (
    <div className="w-full max-w-2xl  mx-auto bg-white rounded-xl border border-gray-200 p-2  ">
      {/* Text Area */}
      <div className="mb-2">
        <textarea
          className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
          placeholder="e.g. 'How to become a better man' or 'Top 10 Most deadliest animals in the world'"
          rows={4}
        />
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between space-x-2 md:space-x-4">
        {/* Writing Style Select */}
        <div className="min-w-[120px] md:min-w-[160px] ">
          <Select value={writingStyle} onValueChange={setWritingStyle} >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Writing Style" />
            </SelectTrigger>
            <SelectContent>
              {writingStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Thread Length Slider */}
        <div className="flex items-center space-x-2">
          <label className="text-gray-500 md:inline whitespace-nowrap">Thread Length:</label>
          <div className="flex items-center space-x-3">
            <Slider
              value={threadLength}
              onValueChange={setThreadLength}
              max={10}
              min={5}
              step={1}
              className="w-20 md:w-24"
            />
            <span className="text-black font-medium min-w-[20px] whitespace-nowrap">{threadLength[0]}</span>
          </div>
        </div>

        {/* Generate Thread Button */}
        <button className="flex items-center space-x-0 bg-black text-white p-3 rounded-full font-medium hover:bg-gray-900 transition-colors cursor-pointer lg:px-4 lg:space-x-2 lg:py-2 whitespace-nowrap">
          <Sparkles className="w-5 h-5 lg:w-4 lg:h-4" />
          <span className='text-sm hidden lg:inline'>Generate Thread</span>
        </button>
      </div>
    </div>
  )
}

export default ThreadGeneratorForm