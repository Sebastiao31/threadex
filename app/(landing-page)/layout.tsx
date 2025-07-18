import React from 'react'
import NavBar from '@/components/NavBar'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <NavBar />
        {children}
    </div>
  )
}

export default layout