import React, { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import CustomPrompt from './CustomPrompt'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

interface AiImageProps {
  tweetIndex: number
  tweetContent: string
  threadTopic: string
  onImageGenerated: (index: number, imageData: { url: string; prompt?: string }) => void
}

const AiImage = ({ tweetIndex, tweetContent, threadTopic, onImageGenerated }: AiImageProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [showCustomPrompt, setShowCustomPrompt] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')

  const handleGenerateImage = async (overridePrompt?: string) => {
    if (isGenerating) return
    
    if (!tweetContent || tweetContent.trim().length === 0) {
      alert('Please write some content in the tweet first to generate a relevant image.')
      return
    }

    setIsGenerating(true)
    try {
      const finalPrompt = overridePrompt || customPrompt.trim()
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tweetContent: tweetContent.trim(),
          threadName: threadTopic,
          ...(finalPrompt && { prompt: finalPrompt })
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      if (data.success && data.imageUrl) {
        onImageGenerated(tweetIndex, {
          url: data.imageUrl,
          prompt: data.prompt
        })
      } else {
        throw new Error('No image URL received')
      }

    } catch (error: any) {
      console.error('Error generating image:', error)
      alert(error.message || 'Failed to generate image. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCustomPromptSubmit = (prompt: string) => {
    setCustomPrompt(prompt)
    handleGenerateImage(prompt)
  }

  const handleClick = () => {
    handleGenerateImage()
  }

  return (  
<div className="relative">
<main className='flex justify-center items-center'>
    <Tooltip>
        <TooltipTrigger>
            <div 
              className={`rounded-md p-1.5 transition-colors ${
                isGenerating 
                  ? 'cursor-not-allowed opacity-50' 
                  : 'hover:bg-[#1d9bf0]/5 cursor-pointer'
              }`}
              onClick={handleClick}
              onContextMenu={(e) => {
                e.preventDefault()
                setShowCustomPrompt(!showCustomPrompt)
              }}
            >
                {isGenerating ? (
                  <Loader2 className='w-5 h-5 text-[#1d9bf0] animate-spin' />
                ) : (
                  <Sparkles className='w-5 h-5 text-[#1d9bf0]' />
                )}
            </div>
        </TooltipTrigger>
        <TooltipContent>
            <p>{isGenerating ? 'Generating Image...' : 'Generate AI Image'}</p>
            <p className="text-xs opacity-75">Right-click for custom prompt (recommended)</p>
        </TooltipContent>
    </Tooltip>
</main>

<CustomPrompt
  isVisible={showCustomPrompt}
  onClose={() => setShowCustomPrompt(false)}
  onSubmit={handleCustomPromptSubmit}
  initialPrompt={customPrompt}
/>
</div>
  )
}

export default AiImage