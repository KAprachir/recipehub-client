import React from 'react'

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mt-2">Thank you for your purchase!</p>
    </div>
  )
}
