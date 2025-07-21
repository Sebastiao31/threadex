import ThreadsHeader from '@/components/ThreadsHeader'
import React from 'react'

const layout = ({params, children}: {params: {id: string}, children: React.ReactNode}) => {
  return (
    <main>
      {/* Fixed ThreadsHeader with proper positioning */}
      <div className="fixed top-0 left-64 right-0 z-30 bg-white border-b border-gray-200 max-md:left-0 max-md:top-16">
        <div className="flex items-center justify-between px-6 py-4">
          <ThreadsHeader params={params}/>
        </div>
      </div>
      
      {/* Content with appropriate top spacing */}
      <div className="max-md:pt-24">
        {children}
      </div>
    </main>
  )
}

export default layout