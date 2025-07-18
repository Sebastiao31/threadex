import React from 'react'
import Link from 'next/link'

const NavItems = () => {
  return (
    <main className='flex gap-4'>
        <div>
            <Link href="/home" className='text-black'>Home</Link>
        </div>
        <div>
            <Link href="/pricing" className='text-black'>Pricing</Link>
        </div>
        <div>
            <Link href="/features" className='text-black'>Features</Link>
        </div>

    </main>
  )
}

export default NavItems