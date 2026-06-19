import { serverFetch } from '../core/server'

export async function getAdminRecipesData () {
  return await serverFetch('/api/admin/recipes-summary')
}

export const getRecipes = async filters => {
  const { page, category, cuisine, difficulty, maxTime, sortBy } = filters

  // কুয়েরি প্যারামিটার তৈরি করা
  const params = new URLSearchParams()
  if (page) params.append('page', page)
  if (category) params.append('category', category)
  if (cuisine) params.append('cuisine', cuisine)
  if (difficulty) params.append('difficulty', difficulty)
  if (maxTime) params.append('maxTime', maxTime)
  if (sortBy) params.append('sortBy', sortBy)

  return serverFetch(`/api/recipes?${params.toString()}`, {
    cache: 'no-store' // disabling caching to get fresh data
  })
}

// recipe by id

export const getRecipeById = async id => {
  return serverFetch(`/api/recipes/${id}`)
}
