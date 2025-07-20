import React, { useState, useRef, useEffect } from 'react'
import { X, Wand2 } from 'lucide-react'

interface CustomPromptProps {
  isVisible: boolean
  onClose: () => void
  onSubmit: (prompt: string) => void
  initialPrompt?: string
  position?: { x: number; y: number }
}

const CustomPrompt = ({ 
  isVisible, 
  onClose, 
  onSubmit, 
  initialPrompt = '',
  position 
}: CustomPromptProps) => {
  const [prompt, setPrompt] = useState(initialPrompt)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [isVisible])

  useEffect(() => {
    setPrompt(initialPrompt)
  }, [initialPrompt])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible, onClose])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible, onClose])

  const handleSubmit = () => {
    const trimmedPrompt = prompt.trim()
    if (trimmedPrompt) {
      onSubmit(trimmedPrompt)
    }
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit()
    }
  }

  if (!isVisible) return null

  const positionStyle = position 
    ? { 
        position: 'fixed' as const, 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        zIndex: 1000
      }
    : { 
        position: 'absolute' as const,
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '8px',
        zIndex: 50
      }

  return (
    <div 
      ref={containerRef}
      className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80 max-w-sm"
      style={positionStyle}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-[#000]" />
          <h3 className="text-sm font-semibold text-gray-800">Custom Image Prompt</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Textarea */}
      <div className="mb-3">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe the image you want to generate..."
          className="w-full h-24 p-3 text-sm border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#000] focus:border-transparent placeholder:text-gray-400"
        />
        <div className="text-xs text-gray-500 mt-1">
          Press Ctrl+Enter to generate • ESC to cancel
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setPrompt('')}
          className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
          disabled={!prompt.trim()}
        >
          Clear
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              prompt.trim()
                ? 'bg-[#000] text-white hover:bg-gray-700 cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Generate Image
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomPrompt 