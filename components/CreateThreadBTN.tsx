import React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

interface CreateThreadBTNProps {
  variant?: 'sidebarvariant' | 'pagevariant'
}

const CreateThreadBTN = ({ variant = 'sidebarvariant' }: CreateThreadBTNProps) => {
  if (variant === 'pagevariant') {
    return (
      <Link
        href="/dashboard"
        className="flex flex-col items-center justify-center w-28 h-36 sm:w-32 sm:h-40 md:w-38 md:h-48 border-2 border-gray-200 border-dashed rounded-lg hover:border-gray-400 hover:bg-gray-50 hover:w-30 hover:h-38 sm:hover:w-34 sm:hover:h-42 md:hover:w-40 md:hover:h-50 transition-all duration-200 group"
      >
        <Plus className="w-8 h-8 text-black group-hover:text-black mb-2" />
      </Link>
    )
  }

  return (
    <Link
      href="/dashboard"
      className="flex items-center justify-center space-x-2 bg-black text-white px-4 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors"
    >
      <Plus className="w-5 h-5" />
      <span>Create Thread</span>
    </Link>
  )
}

export default CreateThreadBTN