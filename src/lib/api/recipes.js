import { serverFetch } from '../core/server'

export async function getAdminRecipesData () {
  return await serverFetch('/api/admin/recipes-summary')
}

export const getRecipes = async filters => {
  const { page, category, cuisine, difficulty, maxTime, sortBy } = filters

  const params = new URLSearchParams()
  if (page) params.append('page', page)
  if (category) params.append('category', category)
  if (cuisine) params.append('cuisine', cuisine)
  if (difficulty) params.append('difficulty', difficulty)
  if (maxTime) params.append('maxTime', maxTime)
  if (sortBy) params.append('sortBy', sortBy)

  return serverFetch(`/api/recipes?${params.toString()}`, {
    cache: 'no-store'
  })
}

export const getRecipeById = async id => {
  return serverFetch(`/api/recipes/${id}`)
}

// ==========================================
// 💡 LEARN & CONNECT STEP: YOUR TASK STARTS HERE!
// Implement the following functions using serverFetch() once your backend API is ready.
// ==========================================

// 1. Get user-specific recipes created by the active logged-in user.
// Hint: You should call serverFetch with the path '/api/user/my-recipes' and disable cache.
export const getUserRecipes = async () => {
  return serverFetch('/api/user/my-recipes', { cache: 'no-store' })
}

// 2. Get premium recipes purchased/unlocked by the active logged-in user.
// Hint: You should call serverFetch with the path '/api/user/purchased' and disable cache.
export const getUserPurchasedRecipes = async () => {
  // TODO: Uncomment and use this:
  // return serverFetch('/api/user/purchased', { cache: 'no-store' })
}
