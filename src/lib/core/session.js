'use server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

import { cache } from 'react'

// React cache ensures getSession is only called once per request
export const getCachedSession = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    return session || null
  } catch (error) {
    console.error("Error fetching session:", error)
    return null
  }
})

export const getUserSession = async () => {
  const session = await getCachedSession()
  return session?.user || null
}

export const getUserToken = async () => {
  const session = await getCachedSession()
  return session?.session?.token || null
}
