import { serverFetch } from '../core/server'

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

  // আপনার লোকাল বা প্রোডাকশন সার্ভারের URL-এ হিট করা
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'
  const res = await fetch(`${baseUrl}/api/recipes?${params.toString()}`, {
    cache: 'no-store' // প্রতিবার ফ্রেশ ডাটা আসার জন্য নেক্সটজেএস ক্যাশ অফ করা হলো
  })

  return res.json() // এটি সরাসরি { recipes, totalCount } রিটার্ন করবে
}

// recipe by id

export const getRecipeById = async id => {
  return serverFetch(`/api/recipes/${id}`)
}

export async function getAdminRecipesData () {
  return await serverFetch('/api/admin/recipes-summary')
}
