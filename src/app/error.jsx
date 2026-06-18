"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function ErrorPage({ error, reset }) {
  // Log the error to your error reporting service (e.g., Sentry) on mount
  useEffect(() => {
    console.error("Application Error Caught by Boundary:", error);
  }, [error]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-950 antialiased selection:bg-[#046A38]/20 selection:text-[#046A38]">
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center space-y-8">
        {/* Thematic Warning Icon Header */}
        <div className="relative flex items-center justify-center">
          {/* Soft Red Pulse Background for Error Context */}
          <div className="absolute w-28 h-28 rounded-full bg-red-500/10 animate-pulse"></div>

          <div className="w-20 h-20 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl flex items-center justify-center shadow-xl z-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
            <AlertTriangle size={36} className="text-red-500 stroke-[2]" />
          </div>
        </div>

        {/* Copywriting Section */}
        <div className="space-y-3 max-w-md mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Something burnt in the oven.
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            We encountered an unexpected technical error while preparing your
            request. Our engineering team has been notified.
          </p>

          {/* Optional: Developer mode error message display */}
          <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-x-auto text-left">
            <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 break-words">
              {error?.message ||
                "Unknown rendering or data fetching error occurred."}
            </p>
          </div>
        </div>

        {/* Interactive Recovery Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
          {/* Next.js Error Reset Trigger */}
          <Button
            onPress={() => reset()}
            className="w-full sm:w-auto bg-[#046A38] text-white font-semibold h-12 px-6 rounded-xl hover:bg-[#03542C] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <RefreshCcw size={18} className="stroke-[2.5]" />
            <span>Try Again</span>
          </Button>

          {/* Safe Fallback Navigation */}
          <Button
            as={Link}
            href="/"
            variant="bordered"
            className="w-full sm:w-auto border-2 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold h-12 px-6 rounded-xl bg-transparent transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Home size={18} className="stroke-[2.5]" />
            <span>Return Home</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
