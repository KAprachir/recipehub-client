import { serverMutation } from '../core/server'

// Dismiss Report: Updates the status of a user moderation report to 'Dismissed'
export const dismissReport = async id => {
  return serverMutation(`/api/admin/reports/${id}/dismiss`, {}, 'PUT')
}

// Take Down Recipe: Deletes reported recipe from catalog and resolves moderation reports
export const takeDownRecipe = async id => {
  return serverMutation(`/api/admin/recipes/${id}`, {}, 'DELETE')
}

// Run Diagnostics: Triggers system-wide diagnostic checks for admin dashboard
export const runDiagnostics = async () => {
  return serverMutation('/api/admin/diagnostics/run', {}, 'POST')
}

// Toggle Feature Recipe: Admins can feature or unfeature recipes
export const toggleFeatureRecipe = async (id, isFeatured) => {
  return serverMutation(`/api/admin/recipes/${id}/feature`, { isFeatured }, 'PATCH')
}

// Update Recipe Admin: Admins can edit recipe metadata
export const updateRecipeAdmin = async (id, recipeData) => {
  return serverMutation(`/api/admin/recipes/${id}`, recipeData, 'PATCH')
}

// Update User Status: Block or unblock a user
export const updateUserStatus = async (id, status) => {
  return serverMutation(`/api/admin/users/${id}/status`, { status }, 'PATCH')
}


