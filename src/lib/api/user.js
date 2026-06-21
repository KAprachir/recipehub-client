import { serverFetch } from '../core/server'

export const getUsers = async () => {
  return serverFetch(`/api/users`)
}

// ==========================================
// 💡 LEARN & CONNECT STEP: YOUR TASK STARTS HERE!
// Implement the following functions using serverFetch() once your backend API is ready.
// ==========================================

// 1. Fetch user dashboard summary details (totals for recipes, favorites, likes, activities).
// Hint: Point to '/api/user/dashboard-summary' and disable cache.
export const getUserDashboardSummary = async () => {
  // TODO: Uncomment and use this
  return serverFetch('/api/user/dashboard-summary', { cache: 'no-store' })
}

// 2. Fetch list of recipes favorited by the current logged-in user.
// Hint: Point to '/api/user/favorites' and disable cache.
export const getUserFavorites = async () => {
  // TODO: Uncomment and use this:
  return serverFetch('/api/user/favorites', { cache: 'no-store' })
}
