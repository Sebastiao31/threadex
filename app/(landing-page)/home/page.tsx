import Link from 'next/link'
import React from 'react'
import SignIn from '@/components/SignIn'
import TwitterSignInButton  from '@/components/TwitterSignInButton'

const HomePage = () => {
  return (
    <main>
      <h1> Im in the landing page</h1>
      <button>
        <Link href="/dashboard">Go to Dashboard</Link>
      </button>
      <button>
        <TwitterSignInButton/>
      </button>
    </main>
  )
}

export default HomePage