import { serverMutation } from '../core/server'

export const createRecipe = async newRecipeData => {
  return serverMutation('/api/recipes', newRecipeData, 'POST')
}

// ==========================================
// 💡 LEARN & CONNECT STEP: YOUR TASK STARTS HERE!
// Implement the following mutation actions using serverMutation().
// ==========================================

// 1. Delete user's own recipe.
// Hint: Trigger a DELETE request to '/api/recipes/:id'.
export const deleteRecipe = async id => {
  // TODO: Uncomment and use this:
  // return serverMutation(`/api/recipes/${id}`, {}, 'DELETE')
}

// 2. Toggle favorite status (adds or removes a recipe from the user's favorites).
// Hint: Trigger a POST request to '/api/recipes/:id/favorite'.
export const toggleFavoriteRecipe = async id => {
  // TODO: Uncomment and use this:
  // return serverMutation(`/api/recipes/${id}/favorite`, {}, 'POST')
}
