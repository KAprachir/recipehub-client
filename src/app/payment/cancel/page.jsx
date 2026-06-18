import React from 'react'

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mt-2">Your payment was cancelled. You can try again.</p>
    </div>
  )
}
