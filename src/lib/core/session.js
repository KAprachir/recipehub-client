'use server'
import { auth } from '@/lib/auth'
import { headers, cookies } from 'next/headers'
import { cache } from 'react'
import jwt from 'jsonwebtoken'

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
  try {
    const cookieStore = await cookies()
    const jwtToken = cookieStore.get('recipehub_jwt')?.value
    if (jwtToken) {
      return jwtToken
    }

    const session = await getCachedSession()
    if (session && session.user) {
      const tokenPayload = {
        id: session.user.id,
        _id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role
      }
      return jwt.sign(tokenPayload, process.env.BETTER_AUTH_SECRET, {
        expiresIn: '7d'
      })
    }
  } catch (error) {
    console.error("Error in getUserToken:", error)
  }
  return null
}

