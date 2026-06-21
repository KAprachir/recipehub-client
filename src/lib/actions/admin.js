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
