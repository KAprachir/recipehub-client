import { serverFetch, serverMutation } from '../core/server'

// ==========================================
// 💡 LEARN & CONNECT STEP: YOUR TASK STARTS HERE!
// Implement the following functions using serverFetch() or serverMutation().
// ==========================================

// 1. Verify payment session token (synchronize user membership to 'premium').
// Hint: Trigger a GET query to `/api/payment/verify?session_id=${sessionId}`.
export const verifyPaymentSession = async sessionId => {
  return serverFetch(`/api/payment/verify?session_id=${sessionId}`, { cache: 'no-store' })
}

// 2. Audit/Log transaction cancellation for diagnostic reports.
// Hint: Trigger a POST request to `/api/payment/log-cancel`.
export const logPaymentCancel = async data => {
  return serverMutation('/api/payment/log-cancel', data, 'POST')
}
