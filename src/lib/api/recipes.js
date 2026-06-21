import { serverFetch } from '../core/server'

// Get Admin Recipes Summary: Fetch overview of all recipes for administrative dashboards
export async function getAdminRecipesData () {
  return await serverFetch('/api/admin/recipes-summary')
}

// Get Recipes: Query recipes dynamically with filters (page, category, cuisine, etc.)
export const getRecipes = async filters => {
  const { page, category, cuisine, difficulty, maxTime, sortBy, isFeatured } = filters

  const params = new URLSearchParams()
  if (page) params.append('page', page)
  if (category) params.append('category', category)
  if (cuisine) params.append('cuisine', cuisine)
  if (difficulty) params.append('difficulty', difficulty)
  if (maxTime) params.append('maxTime', maxTime)
  if (sortBy) params.append('sortBy', sortBy)
  if (isFeatured !== undefined) params.append('isFeatured', isFeatured)

  return serverFetch(`/api/recipes?${params.toString()}`, {
    cache: 'no-store'
  })
}

// Get Recipe By ID: Retrieve detail page data for a specific recipe
export const getRecipeById = async id => {
  return serverFetch(`/api/recipes/${id}`)
}

// Get User Recipes: Retrieve user-specific recipes created by the active logged-in user
export const getUserRecipes = async () => {
  return serverFetch('/api/user/my-recipes', { cache: 'no-store' })
}

// Get User Purchased Recipes: Retrieve premium recipes purchased/unlocked by the logged-in user
export const getUserPurchasedRecipes = async () => {
  return serverFetch('/api/user/purchased', { cache: 'no-store' })
}
