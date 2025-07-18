import React from 'react'
import Link from 'next/link'
import NavItems from './NavItems'

const NavBar = () => {
  return (
    <main className='flex justify-between items-center p-4 bg-white'>
        <div>
            <Link href="/home" className='text-2xl font-bold text-black'>
            Threadex</Link>
        </div>
        <div>
          <NavItems />
        </div>
    </main>
  )
}

export default NavBar