import { serverFetch } from '../core/server'

// ==========================================
// 💡 LEARN & CONNECT STEP: YOUR TASK STARTS HERE!
// Implement the following functions using serverFetch() once your admin backend endpoints are ready.
// ==========================================

// 1. Fetch total users, recipes, premium members, and logs for the admin command center.
// Hint: Query '/api/admin/overview-summary' with no-store.
export const getAdminDashboardSummary = async () => {
  // TODO: Uncomment and use this:
  // return serverFetch('/api/admin/overview-summary', { cache: 'no-store' })
}

// 2. Fetch all reported items and flags.
// Hint: Query '/api/admin/reports' with no-store.
export const getAdminReports = async () => {
  // TODO: Uncomment and use this:
  // return serverFetch('/api/admin/reports', { cache: 'no-store' })
}
