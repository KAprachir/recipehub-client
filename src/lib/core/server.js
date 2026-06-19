'use server'
import { getUserToken } from './session'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const authHeader = async () => {
  const token = await getUserToken()
  return token ? { authorization: `Bearer ${token}` } : {}
}

export const serverFetch = async (path, options = {}) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        ...(await authHeader()),
        ...options.headers
      }
    })
    
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Fetch failed with status ${res.status}: ${errorText}`)
    }
    
    return await res.json()
  } catch (error) {
    console.error(`Error in serverFetch for ${path}:`, error.message)
    throw error
  }
}

export const serverMutation = async (path, data, method = 'POST', options = {}) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(await authHeader()),
        ...options.headers
      },
      body: JSON.stringify(data),
      ...options
    })
    
    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Mutation failed with status ${res.status}: ${errorText}`)
    }
    
    return await res.json()
  } catch (error) {
    console.error(`Error in serverMutation for ${path}:`, error.message)
    throw error
  }
}
