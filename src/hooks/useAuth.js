'use client'

import { authClient } from '@/lib/auth-client'

// Assuming your Better-Auth client is set up in src/lib/auth-client.js

export const useAuth = () => {
  // Official Better-Auth client hook is used
  const { data: session, isPending, error } = authClient.useSession()

  // Return data for use in other components
  return {
    user: session?.user
      ? {
          ...session.user,
          isPremium: session.user.role === "premium",
        }
      : null, // User's name, email, role, image etc. will be here
    session: session, // Full session object
    loading: isPending, // For tracking if data is loading
    error: error // To catch any errors
  }
}
