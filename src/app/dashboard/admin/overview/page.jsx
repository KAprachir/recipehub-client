"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
// 💡 BACKEND CALL: Import the query/mutation helpers once defined in lib/api/admin.js and lib/actions/admin.js:
// import { getAdminDashboardSummary } from "@/lib/api/admin";
// import { runDiagnostics } from "@/lib/actions/admin";
import {
  Users,
  Utensils,
  Star,
  AlertTriangle,
  Bell,
  Search,
  Grid,
  TrendingUp,
  Activity,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Monthly");

  // 💡 BACKEND CALL:
  // Hook up states for real statistics.
  // 1. Uncomment the getAdminDashboardSummary import at the top of this file.
  // 2. In your useEffect, load admin status statistics from backend:
  //    const data = await getAdminDashboardSummary();
  //    setStats(data);
  const [stats, setStats] = useState({
    totalUsers: "24,512",
    totalRecipes: "128,902",
    premiumMembers: "8,104",
    totalReports: "42",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // 💡 BACKEND CALL:
  // Trigger system diagnostics run.
  // 1. Uncomment the runDiagnostics import at the top.
  // 2. Uncomment the function call below.
  const handleDiagnostics = async () => {
    try {
      console.log("Running diagnostics...");
      // await runDiagnostics();
    } catch (error) {
      console.error("Failed to run diagnostics:", error);
    }
  };

  // Animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const barData = [
    { month: "Jan", height: "40%", active: false },
    { month: "Feb", height: "55%", active: false },
    { month: "Mar", height: "50%", active: false },
    { month: "Apr", height: "65%", active: false },
    { month: "May", height: "60%", active: false },
    { month: "Jun", height: "95%", active: true }, // Highlighted June peak in mockup
    { month: "Jul", height: "80%", active: false },
    { month: "Aug", height: "75%", active: false },
    { month: "Sep", height: "85%", active: false },
    { month: "Oct", height: "60%", active: false },
    { month: "Nov", height: "50%", active: false },
    { month: "Dec", height: "75%", active: false },
  ];

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
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
              Admin Command Center
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              System health and configuration overview.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex items-center flex-1 md:w-64">
              <Search size={16} className="absolute left-3 text-zinc-400" />
              <input
                type="text"
                placeholder="Search system logs..."
                className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-800/85 focus:outline-hidden focus:border-[#046A38] focus:ring-1 focus:ring-[#046A38]/50 transition-all shadow-2xs"
              />
            </div>
            
            {/* Actions: Bell and Grid */}
            <button className="p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 shadow-2xs cursor-pointer relative shrink-0">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            </button>
            <button className="p-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 shadow-2xs cursor-pointer shrink-0">
              <Grid size={16} />
            </button>
          </div>
        </motion.div>

        {/* ─── TOP METRICS ROW (4 COLUMNS) ─── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Total Users */}
          <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-teal-50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 rounded-xl">
                  <Users size={18} />
                </div>
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  +12% &uarr;
                </span>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Total Users
                </p>
                <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                  {loading ? "..." : stats.totalUsers}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Total Recipes */}
          <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 rounded-xl">
                  <Utensils size={18} />
                </div>
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  +5.4% &uarr;
                </span>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Total Recipes
                </p>
                <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                  {loading ? "..." : stats.totalRecipes}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Premium Members */}
          <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 rounded-xl">
                  <Star size={18} fill="currentColor" className="stroke-none" />
                </div>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  +1.2% &uarr;
                </span>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Premium Members
                </p>
                <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                  {loading ? "..." : stats.premiumMembers}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Card 4: Total Reports */}
          <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="p-5 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-xl">
                  <AlertTriangle size={18} />
                </div>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  -3% &darr;
                </span>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Total Reports
                </p>
                <p className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                  {loading ? "..." : stats.totalReports}
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* ─── SYSTEM GROWTH GRAPH & RECENT ACTIVITY (2 COLUMNS) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: System Growth Overview (2/3 Width) */}
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants} className="h-full">
              <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
                
                {/* Header Switcher Row */}
                <div className="flex items-center justify-between border-b border-zinc-50 dark:border-zinc-900/60 pb-4">
                  <h2 className="text-sm font-black text-zinc-900 dark:text-white tracking-tight">
                    System Growth Overview
                  </h2>
                  <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-lg w-fit">
                    {["Weekly", "Monthly"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          activeTab === tab
                            ? "bg-[#046A38] text-white shadow-xs"
                            : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated monthly vertical growth chart */}
                <div className="flex items-end justify-between h-56 pt-6 gap-3">
                  {barData.map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: bar.height }}
                        transition={{ delay: 0.1 + idx * 0.04, duration: 0.6, ease: "easeOut" }}
                        className={`w-full rounded-t-[4px] ${
                          bar.active 
                            ? "bg-[#046A38] dark:bg-emerald-500 opacity-90 shadow-2xs" 
                            : "bg-[#046A38]/30 dark:bg-emerald-500/20"
                        }`}
                      />
                      <span className="text-[9px] font-bold text-zinc-400 tracking-wider">
                        {bar.month}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Recent Activity & Status (1/3 Width) */}
          <div className="lg:col-span-1">
            <motion.div variants={itemVariants} className="h-full">
              <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
                
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-zinc-50 dark:border-zinc-900/60 pb-3">
                  <h2 className="text-sm font-black text-zinc-900 dark:text-white tracking-tight">
                    Recent Activity
                  </h2>
                  {/* 💡 SERVER INTEGRATION STEP 2:
                      Link to history or transaction logging page
                  */}
                  <Link
                    href="#"
                    className="text-[10px] font-bold text-[#046A38] dark:text-emerald-400 hover:underline"
                  >
                    View All
                  </Link>
                </div>

                {/* System Activity Feed Log */}
                <div className="space-y-4 py-4 flex-1">
                  
                  {/* Log 1 */}
                  <div className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                        New premium subscription
                      </p>
                      <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                        User #4902 &bull; 2 mins ago
                      </p>
                    </div>
                  </div>

                  {/* Log 2 */}
                  <div className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                        Recipe Flagged: &ldquo;Spicy Ramen&rdquo;
                      </p>
                      <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                        Report ID #1209 &bull; 15 mins ago
                      </p>
                    </div>
                  </div>

                  {/* Log 3 */}
                  <div className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                        Payout processed ($1,240)
                      </p>
                      <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                        Batch #A-22 &bull; 1 hour ago
                      </p>
                    </div>
                  </div>

                  {/* Log 4 */}
                  <div className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                        Server maintenance scheduled
                      </p>
                      <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                        System &bull; 3 hours ago
                      </p>
                    </div>
                  </div>

                  {/* Log 5 */}
                  <div className="flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <div>
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                        New user registration
                      </p>
                      <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                        User #5012 &bull; 4 hours ago
                      </p>
                    </div>
                  </div>
                </div>

                {/* System Uptime box at bottom of column */}
                <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900/60 p-3 rounded-xl flex items-start gap-2.5">
                  <Activity size={14} className="text-zinc-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold leading-relaxed">
                    System uptime is <span className="text-[#046A38] dark:text-emerald-400 font-black">99.98%</span> for the last 24 hours.
                  </p>
                </div>

              </Card>
            </motion.div>
          </div>
        </div>

        {/* ─── BOTTOM ROW: INSIGHTS & DIAGNOSTICS (2 COLUMNS) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-2">
          
          {/* Card 1: Chef Insights (3/5 Width) */}
          <div className="lg:col-span-3 h-full">
            <motion.div variants={itemVariants} className="h-full">
              <Card className="bg-zinc-950 border border-zinc-900 shadow-sm rounded-2xl overflow-hidden min-h-[160px] h-full flex relative group">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-100 group-hover:scale-103 transition-transform duration-700" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80")' }} />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-transparent" />
                
                <div className="p-6 flex flex-col justify-between space-y-4 relative z-10 max-w-md">
                  <div>
                    <h3 className="text-white font-black text-sm uppercase tracking-wider">
                      Chef Insights
                    </h3>
                    <p className="text-zinc-300 font-medium text-[11px] leading-relaxed mt-2">
                      Review the top-performing recipes of the month and trending ingredients in our global community.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Card 2: Data Hub Widget (2/5 Width) */}
          <div className="lg:col-span-2 h-full">
            <motion.div variants={itemVariants} className="h-full">
              <Card className="bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl p-6 h-full flex flex-col items-center justify-between text-center gap-4">
                
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-[#046A38] dark:text-emerald-400 rounded-full shadow-2xs">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-black text-zinc-950 dark:text-white uppercase tracking-wider">
                    Data Hub Ready
                  </h4>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                    Global system resources are optimized. No critical warnings detected in the current session cycle.
                  </p>
                </div>

                {/* 💡 BACKEND CALL:
                    Attach action diagnostics running script or triggers.
                    Bind onClick to handleDiagnostics.
                */}
                <Button
                  onClick={handleDiagnostics}
                  variant="bordered"
                  size="sm"
                  className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-[10px] uppercase rounded-xl px-5 h-9 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-2xs cursor-pointer"
                >
                  Run Diagnostics
                </Button>

              </Card>
            </motion.div>
          </div>
        </div>

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
            &copy; 2024 RecipeHub Professional Culinary Systems. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            About Us
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-[#046A38] dark:hover:text-emerald-400 transition-colors">
            Contact Support
          </Link>
        </div>
      </motion.footer>
    </motion.div>
  );
}
