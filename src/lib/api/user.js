import { serverFetch } from '../core/server'

// Get Users: Retrieve all users in the system
export const getUsers = async () => {
  return serverFetch(`/api/users`)
}

// Get User Dashboard Summary: Retrieve overview statistics for the logged-in user's dashboard
export const getUserDashboardSummary = async () => {
  return serverFetch('/api/user/dashboard-summary', { cache: 'no-store' })
}

// Get User Favorites: Fetches the list of recipes favorited by the logged-in user
export const getUserFavorites = async () => {
  return serverFetch('/api/user/favorites', { cache: 'no-store' })
}
