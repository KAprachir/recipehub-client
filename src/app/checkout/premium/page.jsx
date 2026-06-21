"use client";

import { useEffect, useRef } from "react";

export default function CheckoutPremiumRedirect() {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 text-zinc-800 dark:text-zinc-200">
      <form ref={formRef} action="/api/checkout_sessions" method="POST" className="hidden" />
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <h1 className="text-lg font-bold tracking-tight">Redirecting to Stripe Checkout</h1>
        <p className="text-xs text-zinc-400 font-medium">Please wait while we secure your checkout session...</p>
      </div>
    </div>
  );
}
