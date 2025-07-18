import React from 'react'
import Image from 'next/image'
import logo from '../assets/images/logo.png'

const LogoBadge = () => {
  return (
        <div className="flex items-center justify-center bg-black w-10 h-10 rounded-lg">
        <Image 
          src={logo} 
          alt="ThreadEx Logo" 
          width={24} 
          height={24}
          className="rounded-lg"
        />
    </div>
  )
}

export default LogoBadge