import { serverMutation } from '../core/server'

// Create Recipe: Submits a new recipe document to the backend
export const createRecipe = async newRecipeData => {
  return serverMutation('/api/recipes', newRecipeData, 'POST')
}

// Delete Recipe: Removes a user's own recipe by its ID
export const deleteRecipe = async id => {
  return serverMutation(`/api/recipes/${id}`, {}, 'DELETE')
}

// Toggle Favorite Status: Adds or removes a recipe from the user's favorites in the database
export const toggleFavoriteRecipe = async (id) => {
  return serverMutation(`/api/recipes/${id}/favorite`, {}, 'POST')
}

// Like Recipe: Increments the likes count of a recipe by 1 in the database
export const likeRecipe = async (id) => {
  return serverMutation(`/api/recipes/${id}/like`, {}, 'POST')
}

// Report Recipe: Submits a recipe moderation report containing reason
export const reportRecipe = async (recipeId, recipeName, reason) => {
  return serverMutation('/api/reports', { recipeId, recipeName, reason }, 'POST')
}

