import React from 'react'
import Link from 'next/link'
import LogoBadge from './LogoBadge'

const SideBarHeader = () => {
  return (
    <div className="flex items-center space-x-2 px-2 py-3">
      <div>
        <LogoBadge/>
      </div>
      <Link href="/dashboard" className="text-xl font-bold text-gray-800">
        Threadex
      </Link>
    </div>
  )
}

export default SideBarHeader