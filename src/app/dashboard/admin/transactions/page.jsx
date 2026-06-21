"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button, Avatar } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { getAdminTransactions } from "@/lib/api/admin";
import {
  Search,
  CreditCard,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Receipt,
  FileSpreadsheet,
} from "lucide-react";
import Swal from "sweetalert2";

export default function AdminTransactionsPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getAdminTransactions();
        if (data && Array.isArray(data)) {
          setTransactions(data);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        console.error("Error loading transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const email = tx.email || "";
    const method = tx.method || "";
    const amount = tx.amount || "";
    const txId = tx.sessionId || tx.paymentIntentId || tx.id || "";
    return (
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      method.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Calculate stats
  const totalVolume = transactions.reduce((acc, curr) => {
    const cleanAmount = parseFloat((curr.amount || "$0").replace(/[^0-9.]/g, ""));
    return acc + (isNaN(cleanAmount) ? 0 : cleanAmount);
  }, 0);

  const premiumCount = transactions.filter((tx) => tx.isPremiumUpgrade).length;
  const unlocksCount = transactions.filter((tx) => !tx.isPremiumUpgrade && tx.recipeId).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="max-w-7xl mx-auto space-y-8 text-zinc-800 dark:text-zinc-200 min-h-screen flex flex-col justify-between"
    >
      <div className="space-y-6">
        {/* ─── HEADER AREA ─── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-900/60 pb-6"
        >
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Transactions & Revenue Ledger
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Audit secure checkout metrics, monitor Stripe payouts, and analyze premium conversions.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-64">
            <div className="relative flex items-center flex-1">
              <Search size={16} className="absolute left-3 text-zinc-400" />
              <input
                type="text"
                placeholder="Search ledger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-800/85 focus:outline-hidden focus:border-[#046A38] focus:ring-1 focus:ring-[#046A38]/50 transition-all shadow-2xs"
              />
            </div>
          </div>
        </motion.div>

        {/* ─── METRIC STATS ROW (3 COLUMNS) ─── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Box 1: Total Volume */}
          <Card className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xs rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Gross Sales Volume</p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                ${totalVolume.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-[#046A38] dark:text-emerald-400 rounded-xl">
              <TrendingUp size={20} />
            </div>
          </Card>

          {/* Box 2: Premium Memberships */}
          <Card className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xs rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Premium Upgrades</p>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-500 mt-1">
                {premiumCount} Purchases
              </p>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-xl">
              <Award size={20} />
            </div>
          </Card>

          {/* Box 3: Recipe Unlocks */}
          <Card className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xs rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Recipe Unlocks</p>
              <p className="text-2xl font-black text-cyan-600 dark:text-cyan-500 mt-1">
                {unlocksCount} Unlocks
              </p>
            </div>
            <div className="p-3 bg-cyan-50 dark:bg-cyan-950/20 text-cyan-500 rounded-xl">
              <Sparkles size={20} />
            </div>
          </Card>
        </motion.div>

        {/* ─── TRANSACTIONS TABLE ─── */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((placeholder) => (
              <Card key={placeholder} className="p-6 h-20 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredTransactions.length > 0 ? (
          <motion.div
            variants={itemVariants}
            className="w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-xs"
          >
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse select-none">
                <thead>
                  <tr className="bg-zinc-50/50 dark:bg-zinc-900/60 border-b border-zinc-200/60 dark:border-zinc-800/80">
                    <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase">
                      Transaction Info
                    </th>
                    <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase">
                      User Email
                    </th>
                    <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase">
                      Type
                    </th>
                    <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase">
                      Method
                    </th>
                    <th className="p-4 text-xs font-bold text-zinc-400 tracking-wider uppercase text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {filteredTransactions.map((tx) => {
                    const txId = tx.paymentIntentId || tx.sessionId || tx._id || "TXN-ID";
                    const isUpgrade = tx.isPremiumUpgrade;
                    const dateString = tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : "N/A";

                    return (
                      <tr
                        key={tx._id}
                        className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/20 transition-colors"
                      >
                        <td className="p-4 whitespace-nowrap">
                          <div className="space-y-0.5">
                            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                              ID: #{txId.substring(0, 18)}...
                            </p>
                            <p className="text-[10px] text-zinc-400 font-medium">
                              {dateString}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                          {tx.email}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span
                            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              isUpgrade
                                ? "bg-amber-50 dark:bg-amber-950/20 text-amber-600"
                                : "bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600"
                            }`}
                          >
                            {isUpgrade ? "Premium Upgrade" : "Recipe Unlock"}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-xs font-semibold text-zinc-500">
                          {tx.method || "Stripe Checkout"}
                        </td>
                        <td className="p-4 whitespace-nowrap text-right text-xs font-black text-emerald-600 dark:text-emerald-400">
                          {tx.amount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 flex flex-col items-center justify-center text-center max-w-sm mx-auto border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-6"
          >
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/35 border border-zinc-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-600 rounded-2xl mb-4">
              <CreditCard size={32} />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              No Transactions Found
            </h3>
            <p className="text-[10px] text-zinc-400 mt-2 leading-relaxed">
              No revenue records match your query or have been logged in the system ledger database.
            </p>
          </motion.div>
        )}
      </div>

      {/* ─── FOOTER AREA ─── */}
      <motion.footer
        variants={itemVariants}
        className="pt-8 mt-12 border-t border-zinc-200/60 dark:border-zinc-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4"
      >
        <div className="space-y-1 text-left">
          <p className="text-sm font-black text-[#046A38] dark:text-emerald-500 tracking-tight">
            RecipeHub
          </p>
          <p className="text-[10px] text-zinc-400 font-medium">
            &copy; 2026 RecipeHub Professional Culinary Systems. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Financial Policies
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Stripe Dashboard
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Audit Ledger
          </Link>
        </div>
      </motion.footer>
    </motion.div>
  );
}
