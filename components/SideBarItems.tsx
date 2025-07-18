import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, CalendarClock, ChartLine, FileText } from 'lucide-react'

const SideBarItems = () => {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/dashboard/threads',
      label: 'Threads',
      icon: (
        <FileText />
      )
    },
    {
      href: '/dashboard/scheduled',
      label: 'Scheduled',
      icon: (
        <CalendarClock/>  
      )
    },
    {
      href: '/dashboard/calendar',
      label: 'Calendar',
      icon: (
        <Calendar/>
      )
    },
    {
      href: '/dashboard/analytics',
      label: 'Analytics',
      icon: (
        <ChartLine/>
      )
    }
  ]

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-gray-200'
                : 'hover:bg-gray-50 '
            }`}
          >
            <span className='text-black'>
              {item.icon}
            </span>
            <span className='text-black text-md'>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default SideBarItems