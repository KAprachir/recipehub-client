'use server'

import { serverMutation } from '../core/server'

export const createRecipe = async newRecipeData => {
  return serverMutation('/api/recipes', newRecipeData, 'POST')
}
