"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

import { X, HelpCircle, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";

function CancelContent() {
  const searchParams = useSearchParams();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <Card className="p-8 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-lg rounded-3xl text-center relative overflow-hidden">
        {/* Decorative subtle background gradient */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Pulsing Cancel/Warning Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
            className="w-16 h-16 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center border-2 border-red-500/20 shadow-2xs relative"
          >
            <X size={32} className="stroke-[3]" />
            <motion.span
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-red-500/30 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
          Transaction Cancelled
        </h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
          Your payment session has ended. No funds have been deducted, and your subscription status remains unchanged.
        </p>

        {/* Helpful Troubleshooting Box */}
        <div className="mt-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900/80 rounded-2xl p-5 text-left space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-2.5">
            <HelpCircle size={14} className="text-zinc-400" />
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Why was it cancelled?</span>
          </div>

          <ul className="space-y-3 text-[10px] text-zinc-500 font-bold leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
              <span>You voluntarily chose to return or abort during the secure gateway check.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
              <span>The credit card was declined by the bank or card issuer network.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
              <span>The secure checkout screen timed out due to temporary inactivity.</span>
            </li>
          </ul>
        </div>



        {/* Actions Row */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard/user/overview" className="flex-1">
            <Button
              variant="bordered"
              className="w-full border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-[10px] uppercase rounded-xl h-10 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={12} />
              <span>Dashboard</span>
            </Button>
          </Link>

          {/* 💡 SERVER INTEGRATION STEP 2:
              Link to your payment page URL to restart the billing procedure.
              Example: href="/billing" or href="/upgrade"
          */}
          <Link href={searchParams.get("recipe_id") ? `/recipes/${searchParams.get("recipe_id")}` : "/recipes"} className="flex-1">
            <Button
              className="w-full bg-[#046A38] dark:bg-emerald-500 text-white dark:text-zinc-950 font-bold text-[10px] uppercase rounded-xl h-10 hover:opacity-95 transition-opacity cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <RefreshCw size={12} />
              <span>Try Again</span>
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

export default function PaymentCancelPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900/10">
      <Suspense fallback={
        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      }>
        <CancelContent />
      </Suspense>
    </div>
  );
}
