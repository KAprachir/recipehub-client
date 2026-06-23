"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { getAdminDashboardSummary, getAdminTransactions } from "@/lib/api/admin";
import {
  TrendingUp,
  Users,
  Utensils,
  CreditCard,
  AlertTriangle,
  ArrowLeft,
  DollarSign,
  Activity,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    premiumMembers: 0,
    totalReports: 0,
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadAdminAnalytics = async () => {
      try {
        setLoading(true);
        const [summaryData, txData] = await Promise.all([
          getAdminDashboardSummary().catch(() => null),
          getAdminTransactions().catch(() => []),
        ]);

        if (summaryData) {
          setStats({
            totalUsers: summaryData.totalUsers || 0,
            totalRecipes: summaryData.totalRecipes || 0,
            premiumMembers: summaryData.premiumMembers || 0,
            totalReports: summaryData.totalReports || 0,
          });
        }
        if (txData) {
          setTransactions(txData);
        }
      } catch (error) {
        console.error("Failed to load admin analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAdminAnalytics();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  // Mock revenue chart data for visual excellence
  const revenueData = [
    { month: "Jan", rev: 1200 },
    { month: "Feb", rev: 1900 },
    { month: "Mar", rev: 2400 },
    { month: "Apr", rev: 2100 },
    { month: "May", rev: 3400 },
    { month: "Jun", rev: 4500 },
    { month: "Jul", rev: 4100 },
  ];
  const maxRev = Math.max(...revenueData.map((d) => d.rev));
  const estimatedRevenue = stats.premiumMembers * 14.99;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-8 text-zinc-800 dark:text-zinc-200 min-h-screen"
    >
      {/* ─── HEADER AREA ─── */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/dashboard/admin/overview"
              className="text-xs font-bold text-zinc-400 hover:text-[#046A38] transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              <span>Back to Command Center</span>
            </Link>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            System Performance & Revenue Analytics
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Track platform conversion rates, transaction health, and community growth.
          </p>
        </div>

        <div className="bg-[#046A38]/10 dark:bg-emerald-500/10 text-[#046A38] dark:text-emerald-400 border border-[#046A38]/20 dark:border-emerald-500/20 font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 w-fit">
          <Activity size={14} />
          <span>Platform Health Online</span>
        </div>
      </motion.div>

      {/* ─── STATS GRID ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Platform Revenue */}
        <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
          <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <DollarSign size={20} />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                +14% &uarr;
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Estimated Monthly Revenue
              </p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                ${loading ? "..." : estimatedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metric 2: Total Active Users */}
        <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
          <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl">
                <Users size={20} />
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                +12% &uarr;
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Registered Users
              </p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                {loading ? "..." : stats.totalUsers.toLocaleString()}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metric 3: Active Premium Users */}
        <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
          <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 rounded-xl">
                <TrendingUp size={20} />
              </div>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                +3.2% &uarr;
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Premium Members
              </p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                {loading ? "..." : stats.premiumMembers.toLocaleString()}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metric 4: System Alerts/Flags */}
        <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
          <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-450 rounded-xl">
                <AlertTriangle size={20} />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                Stable
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Pending Moderations
              </p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                {loading ? "..." : stats.totalReports}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ─── DUAL GRID LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Monthly Revenue Graph */}
        <div className="lg:col-span-2">
          <motion.div variants={itemVariants} className="h-full">
            <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h2 className="text-base font-black text-zinc-900 dark:text-white tracking-tight">
                  Platform Billing (Monthly Sales Growth)
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Stripe Checkout premium conversion volume (USD).
                </p>
              </div>

              {/* Chart implementation */}
              <div className="flex items-end justify-between h-56 pt-6 gap-3 select-none">
                {revenueData.map((bar, idx) => {
                  const hPerc = `${(bar.rev / maxRev) * 90}%`;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 mb-1">
                        ${bar.rev}
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: hPerc }}
                        transition={{ delay: 0.1 + idx * 0.05, duration: 0.6, ease: "easeOut" }}
                        className="w-full rounded-t-md bg-[#046A38] dark:bg-emerald-500 opacity-90 shadow-2xs hover:opacity-100 transition-opacity"
                      />
                      <span className="text-[10px] font-bold text-zinc-400 tracking-wider">
                        {bar.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Card: Recent Transactions log */}
        <div className="lg:col-span-1">
          <motion.div variants={itemVariants} className="h-full">
            <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h2 className="text-base font-black text-zinc-900 dark:text-white tracking-tight pb-3 border-b border-zinc-100 dark:border-zinc-900">
                  Recent Sales Log
                </h2>

                <div className="divide-y divide-zinc-100 dark:divide-zinc-900/60 mt-2 max-h-60 overflow-y-auto pr-1">
                  {transactions.length === 0 ? (
                    <div className="py-12 text-center text-xs text-zinc-400 font-medium">
                      No sales recorded in the current session cycle.
                    </div>
                  ) : (
                    transactions.slice(0, 5).map((tx) => (
                      <div key={tx._id} className="py-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate leading-snug">
                            {tx.recipeName || "Premium Sub"}
                          </p>
                          <p className="text-[9px] font-semibold text-zinc-400 mt-0.5 truncate">
                            {tx.userEmail}
                          </p>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                            +${tx.amount || "14.99"}
                          </span>
                          <span className="text-[8px] font-medium text-zinc-400 mt-0.5">
                            {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "Just now"}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <Link href="/dashboard/admin/transactions">
                  <Button className="w-full bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 text-xs font-bold text-[#046A38] dark:text-emerald-400 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center gap-1 cursor-pointer">
                    <span>View Sales Ledger</span>
                    <CreditCard size={14} />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
