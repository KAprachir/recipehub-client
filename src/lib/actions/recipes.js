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
