import { supabase } from './supabase'

export const signInWithTwitter = async () => {
  try {

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: `${siteUrl}/auth/callback?next=/dashboard`
      }
    })

    if (error) {
      console.error('Error signing in with Twitter:', error.message)
      return { error }
    }

    return { data }
  } catch (error) {
    console.error('Unexpected error:', error)
    return { error }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
      return { error }
    }
    return { success: true }
  } catch (error) {
    console.error('Unexpected error during sign out:', error)
    return { error }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error getting current user:', error.message)
      return { error }
    }
    return { user }
  } catch (error) {
    console.error('Unexpected error getting user:', error)
    return { error }
  }
} 