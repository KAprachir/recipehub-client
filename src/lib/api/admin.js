import { serverFetch } from '../core/server'

// Get Admin Dashboard Summary: Fetch total system metrics (users, recipes, flags) for administrative dashboard
export const getAdminDashboardSummary = async () => {
  return serverFetch('/api/admin/overview-summary', { cache: 'no-store' })
}

// Get Admin Reports: Fetch flagged recipes and moderation reports
export const getAdminReports = async () => {
  return serverFetch('/api/admin/reports', { cache: 'no-store' })
}
