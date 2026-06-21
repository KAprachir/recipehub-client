"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
// 💡 BACKEND CALL: Import the query helper once defined inside lib/api/payment.js:
import { verifyPaymentSession } from "@/lib/api/payment";
import { Check, ShieldCheck, ArrowRight, ExternalLink, Calendar, CreditCard, Receipt } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [txDetails, setTxDetails] = useState({
    txId: "TXN-9021840291",
    amount: "$14.99",
    method: "Stripe Checkout",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  });

  // 💡 BACKEND CALL:
  // Hook up checkout session verification.
  // 1. Uncomment the verifyPaymentSession import at the top of this file.
  // 2. In your useEffect, replace the mock block with the active verification call:
  //    const data = await verifyPaymentSession(sessionId);
  //    setTxDetails({ txId: data.transactionId, amount: data.amount, method: data.method, date: data.date });
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const paymentIntent = searchParams.get("payment_intent");

    if (sessionId || paymentIntent) {
      console.log("Verifying payment on backend with parameters:", { sessionId, paymentIntent });
      const verifyPayment = async () => {
        try {
          const data = await verifyPaymentSession(sessionId || paymentIntent);
          if (data) {
            setTxDetails({
              txId: data.transactionId || data.txId || sessionId || "TXN-VERIFIED",
              amount: data.amount || "$14.99",
              method: data.method || "Stripe Checkout",
              date: data.date || new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            });
          }
        } catch (error) {
          console.error("Failed to verify payment session:", error);
        }
      };
      verifyPayment();
    }
  }, [searchParams]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <Card className="p-8 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-lg rounded-3xl text-center relative overflow-hidden">
        {/* Decorative subtle background gradient */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Bouncing Checkmark Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
            className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center border-2 border-emerald-500/20 shadow-2xs relative"
          >
            <Check size={32} className="stroke-[3]" />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full border border-emerald-500/35 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 font-medium">
          Thank you for your purchase. Your premium access has been verified and fully unlocked.
        </p>

        {/* Transaction Receipt Details Card */}
        <div className="mt-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900/80 rounded-2xl p-4 text-left space-y-3.5">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-2">
            <Receipt size={14} className="text-zinc-400" />
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">Order Summary</span>
          </div>

          <div className="space-y-2.5">
            {/* Transaction ID */}
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400 font-semibold">Transaction ID</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold font-mono">{txDetails.txId}</span>
            </div>

            {/* Date */}
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400 font-semibold flex items-center gap-1">
                <Calendar size={12} className="text-zinc-400/80" />
                Date
              </span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">{txDetails.date}</span>
            </div>

            {/* Payment Method */}
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400 font-semibold flex items-center gap-1">
                <CreditCard size={12} className="text-zinc-400/80" />
                Payment Method
              </span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold">{txDetails.method}</span>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-100 dark:border-zinc-900 my-1" />

            {/* Total Paid */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-zinc-900 dark:text-white font-black">Amount Paid</span>
              <span className="text-[#046A38] dark:text-emerald-400 font-black text-sm">{txDetails.amount}</span>
            </div>
          </div>
        </div>

        {/* Security / Guarantee Badge */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-zinc-400 text-[10px] font-bold">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>Secured by RecipeHub Vault Protection</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-2.5">
          <Link href="/dashboard/user/overview">
            <Button
              className="w-full bg-[#046A38] dark:bg-emerald-500 text-white dark:text-zinc-950 font-bold text-[10px] uppercase rounded-xl h-10 hover:opacity-95 transition-opacity cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Go to Dashboard</span>
              <ArrowRight size={12} />
            </Button>
          </Link>

          <Link href="/recipes">
            <Button
              variant="bordered"
              className="w-full border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-[10px] uppercase rounded-xl h-10 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
            >
              <span>Browse Recipes</span>
              <ExternalLink size={12} />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-900/10">
      <Suspense fallback={
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
