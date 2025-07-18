import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  
  console.log('OAuth callback received:', { 
    code: code ? 'present' : 'missing', 
    error, 
    description: searchParams.get('error_description'),
    state: searchParams.get('state'),
    fullUrl: request.url
  })
  
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get('next') ?? '/dashboard'
  if (!next.startsWith('/')) {
    // if "next" is not a relative URL, use the default
    next = '/dashboard'
  }
  
  console.log('Redirect logic:', {
    nextParam: searchParams.get('next'),
    finalNext: next,
    origin: origin
  })

  // Check if there's an OAuth error
  if (error) {
    console.error('OAuth error detected:', error, searchParams.get('error_description'))
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${error}&description=${encodeURIComponent(searchParams.get('error_description') || '')}`)
  }

  if (code) {
    try {
      const supabase = await createServerClient()
      console.log('Created server client, attempting code exchange...')
      
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!exchangeError && data?.user) {
        console.log('Successfully exchanged code for session:', {
          userId: data.user.id,
          email: data.user.email,
          hasMetadata: !!data.user.user_metadata
        })
        
        const forwardedHost = request.headers.get('x-forwarded-host')
        const isLocalEnv = process.env.NODE_ENV === 'development'
        
        let redirectUrl: string
        if (isLocalEnv) {
          redirectUrl = `${origin}${next}`
        } else if (forwardedHost) {
          redirectUrl = `https://${forwardedHost}${next}`
        } else {
          redirectUrl = `${origin}${next}`
        }
        
        console.log('About to redirect to:', redirectUrl)
        return NextResponse.redirect(redirectUrl)
      } else {
        console.error('Error exchanging code for session:', exchangeError)
        return NextResponse.redirect(`${origin}/auth/auth-code-error?error=exchange_failed&description=${encodeURIComponent(exchangeError?.message || 'Unknown error')}`)
      }
    } catch (err) {
      console.error('Unexpected error during code exchange:', err)
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=unexpected&description=${encodeURIComponent('Unexpected server error')}`)
    }
  }

  console.log('No code or error found, redirecting to error page')
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=no_code&description=${encodeURIComponent('No authorization code received')}`)
} 