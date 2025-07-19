'use client'

import React from 'react'
import SideBarHeader from './SideBarHeader'
import SideBarItems from './SideBarItems'
import SideBarFooter from './SideBarFooter'
import CreateThreadBTN from './CreateThreadBTN'
import { useIsMobile } from '@/hooks/use-mobile'

interface SideBarProps {
  isOpen?: boolean
  onToggle?: () => void
}

const SideBar = ({ isOpen = true, onToggle }: SideBarProps) => {
  const isMobile = useIsMobile()
  
  const sidebarVisible = isMobile ? isOpen : true

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed' : 'fixed'} 
        ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}
        ${isMobile ? 'w-64 z-50' : 'w-64'}
        h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex-1">
              <SideBarHeader />
            </div>
            
            {/* Close button for mobile */}
            {isMobile && (
              <button
                onClick={onToggle}
                className="p-1 rounded-lg  hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* Create Thread Button */}
            <CreateThreadBTN />
            
            {/* Navigation Items */}
            <SideBarItems />
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 border-t pt-4 mt-4">
          <SideBarFooter />
        </div>
      </div>
    </>
  )
}

export default SideBar