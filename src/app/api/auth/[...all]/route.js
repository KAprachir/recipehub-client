import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const authHandlers = toNextJsHandler(auth)

const handleJwtCookie = async (req) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    })

    const cookieStore = await cookies()
    if (session && session.user) {
      const tokenPayload = {
        id: session.user.id,
        _id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role
      }

      const jwtToken = jwt.sign(tokenPayload, process.env.BETTER_AUTH_SECRET, {
        expiresIn: '7d'
      })

      cookieStore.set('recipehub_jwt', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/'
      })
    } else {
      cookieStore.set('recipehub_jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      })
    }
  } catch (error) {
    console.error('Error handling JWT cookie inside auth handler:', error)
  }
}

export const GET = async (req) => {
  const res = await authHandlers.GET(req)
  await handleJwtCookie(req)
  return res
}

export const POST = async (req) => {
  const res = await authHandlers.POST(req)
  await handleJwtCookie(req)
  return res
}

