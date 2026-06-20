import { serverMutation } from '../core/server'

// ==========================================
// 💡 LEARN & CONNECT STEP: YOUR TASK STARTS HERE!
// Implement the following mutation actions using serverMutation().
// ==========================================

// 1. Update status of user reports to "Dismissed".
// Hint: Trigger a PUT request to `/api/admin/reports/${id}/dismiss`.
export const dismissReport = async id => {
  // TODO: Uncomment and use this:
  // return serverMutation(`/api/admin/reports/${id}/dismiss`, {}, 'PUT')
}

// 2. Remove/Take Down recipe from public catalog and resolve reports.
// Hint: Trigger a DELETE request to `/api/admin/recipes/${id}`.
export const takeDownRecipe = async id => {
  // TODO: Uncomment and use this:
  // return serverMutation(`/api/admin/recipes/${id}`, {}, 'DELETE')
}

// 3. Trigger system-wide diagnostic check script.
// Hint: Trigger a POST request to `/api/admin/diagnostics/run`.
export const runDiagnostics = async () => {
  // TODO: Uncomment and use this:
  // return serverMutation('/api/admin/diagnostics/run', {}, 'POST')
}
