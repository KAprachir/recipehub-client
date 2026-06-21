import { serverFetch, serverMutation } from '../core/server'

// Verify Payment Session: Validate the payment session token on the backend to unlock premium user status
export const verifyPaymentSession = async sessionId => {
  return serverFetch(`/api/payment/verify?session_id=${sessionId}`, { cache: 'no-store' })
}

// Log Payment Cancel: Logs failed or cancelled checkout sessions for analytics
export const logPaymentCancel = async data => {
  return serverMutation('/api/payment/log-cancel', data, 'POST')
}
