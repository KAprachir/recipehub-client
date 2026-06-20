"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Avatar, Button } from "@heroui/react";
import { motion } from "framer-motion";
// 💡 BACKEND CALL: Import the query helper once defined inside lib/api/user.js:
// import { getUserDashboardSummary } from "@/lib/api/user";
import {
  BookOpen,
  Heart,
  ThumbsUp,
  Star,
  UserPlus,
  MessageSquare,
  Info,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";

export default function UserOverviewPage() {
  const [loading, setLoading] = useState(true);

  // 💡 BACKEND CALL:
  // Hook up state variables for total recipes count, favorites, likes, and activity logs.
  // 1. Uncomment the getUserDashboardSummary import at the top of this file.
  // 2. In your useEffect, call the API and update the stats state:
  //    const data = await getUserDashboardSummary();
  //    setStats(data);
  const [stats, setStats] = useState({
    totalRecipes: 142,
    totalFavorites: 843,
    likesReceived: "3.2k",
    trendingRecipe: {
      name: "Spicy Truffle Risotto",
      views: "1.2k",
      demand: "High Demand",
    },
  });

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
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
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              Welcome Back, Chef!
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Here is what&apos;s happening with your culinary creations today.
            </p>
          </div>

          {/* Premium Chef gold badge matching mockup */}
          <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/50 font-black uppercase text-[10px] tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xs font-sans shrink-0 w-fit">
            <Award size={14} className="stroke-[2.5]" />
            <span>Premium Chef</span>
          </div>
        </motion.div>

        {/* ─── MAIN TWO-COLUMN DASHBOARD GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Stacked Metric Cards (1/3 Width) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Metric Card 1: Total Recipes */}
            <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between relative overflow-hidden h-full">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-[#046A38] dark:text-emerald-400 rounded-xl">
                    <BookOpen size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg">
                    <TrendingUp size={12} />
                    <span>+12%</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Total Recipes
                  </p>
                  <p className="text-4xl font-black text-zinc-900 dark:text-white mt-1">
                    {loading ? "..." : stats.totalRecipes}
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Metric Card 2: Total Favorites */}
            <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between relative overflow-hidden h-full">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 rounded-xl">
                    <Heart size={20} fill="currentColor" className="stroke-none" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg">
                    <TrendingUp size={12} />
                    <span>+5%</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Total Favorites
                  </p>
                  <p className="text-4xl font-black text-zinc-900 dark:text-white mt-1">
                    {loading ? "..." : stats.totalFavorites}
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Metric Card 3: Likes Received */}
            <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between relative overflow-hidden h-full">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 rounded-xl">
                    <ThumbsUp size={20} fill="currentColor" className="stroke-none" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded-lg">
                    <TrendingUp size={12} />
                    <span>+24%</span>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Likes Received
                  </p>
                  <p className="text-4xl font-black text-zinc-900 dark:text-white mt-1">
                    {loading ? "..." : stats.likesReceived}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column: Recent Activity Feed (2/3 Width) */}
          <div className="lg:col-span-2 h-full">
            <motion.div variants={itemVariants} className="h-full">
              <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
                
                {/* Header section matching mockup */}
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900/60 pb-4">
                  <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                    Recent Activity
                  </h2>
                  {/* 💡 SERVER INTEGRATION STEP 2:
                      Link to history or activities query page
                  */}
                  <Link
                    href="#"
                    className="text-xs font-bold text-[#046A38] dark:text-emerald-400 hover:underline"
                  >
                    View All History
                  </Link>
                </div>

                {/* Activity List container */}
                <div className="divide-y divide-zinc-100 dark:divide-zinc-900/60 flex-1">
                  
                  {/* Activity Item 1 */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0 border border-zinc-100 dark:border-zinc-900">
                        <img
                          src="https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=80&q=80"
                          alt="Summer Berry Tart"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                          &ldquo;Summer Berry Tart&rdquo; received 24 new likes.
                        </p>
                        <p className="text-[10px] text-zinc-400 font-medium">
                          2 hours ago &bull; Performance Milestone
                        </p>
                      </div>
                    </div>
                    <Star size={15} className="text-amber-500 shrink-0" />
                  </div>

                  {/* Activity Item 2 */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 shrink-0 border border-zinc-100 dark:border-zinc-900">
                        <UserPlus size={18} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                          Chef Julian started following you.
                        </p>
                        <p className="text-[10px] text-zinc-400 font-medium">
                          5 hours ago &bull; Community
                        </p>
                      </div>
                    </div>
                    {/* 💡 SERVER INTEGRATION STEP 3:
                        Wire this button to set up following logic (serverMutation to follow back)
                    */}
                    <Button
                      variant="bordered"
                      size="sm"
                      className="border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-[10px] uppercase rounded-xl h-8 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors shadow-2xs shrink-0 cursor-pointer"
                    >
                      Follow Back
                    </Button>
                  </div>

                  {/* Activity Item 3 */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0 border border-zinc-100 dark:border-zinc-900">
                        <img
                          src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=80&q=80"
                          alt="Artisanal Sourdough Guide"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                          New Comment on &ldquo;Artisanal Sourdough Guide&rdquo;.
                        </p>
                        <p className="text-[10px] text-zinc-400 font-medium">
                          Yesterday &bull; Community Interaction
                        </p>
                      </div>
                    </div>
                    <MessageSquare size={15} className="text-zinc-400 shrink-0" />
                  </div>

                  {/* Activity Item 4 */}
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-500 shrink-0 border border-zinc-100 dark:border-zinc-900">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                          RecipeHub Premium features updated.
                        </p>
                        <p className="text-[10px] text-zinc-400 font-medium">
                          2 days ago &bull; System Update
                        </p>
                      </div>
                    </div>
                    <Info size={15} className="text-zinc-400 shrink-0" />
                  </div>

                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* ─── BOTTOM DETAILS ROW ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pt-2">
          {/* Card 1: Trending Recipe (3/5 Width) */}
          <div className="lg:col-span-3 h-full">
            <motion.div variants={itemVariants} className="h-full">
              <Card className="bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl overflow-hidden h-full flex flex-col md:flex-row relative">
                
                {/* Left content block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6 z-10">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider uppercase">
                      Trending Recipe
                    </span>
                    <h3 className="text-xl font-black text-zinc-950 dark:text-white tracking-tight">
                      {loading ? "..." : stats.trendingRecipe.name}
                    </h3>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                        {stats.trendingRecipe.demand}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/60 px-2 py-0.5 rounded-md">
                        {stats.trendingRecipe.views} Views
                      </span>
                    </div>
                  </div>

                  {/* 💡 SERVER INTEGRATION STEP 4:
                      Link to edit/manage trending recipe details page.
                  */}
                  <Button
                    as={Link}
                    href="#"
                    className="bg-zinc-950 hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-white font-bold text-xs h-10 px-4 rounded-xl flex items-center gap-1.5 transition-all w-fit shadow-md cursor-pointer"
                  >
                    <span>Manage Recipe</span>
                    <ArrowRight size={13} />
                  </Button>
                </div>

                {/* Right presentation image frame */}
                <div className="md:w-44 h-44 md:h-full relative overflow-hidden flex-shrink-0 bg-zinc-50 dark:bg-zinc-900/40 flex items-center justify-center p-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border border-zinc-200/60 dark:border-zinc-800/60 ring-4 ring-white dark:ring-zinc-950 relative">
                    <img
                      src="https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80"
                      alt="Trending Risotto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Card 2: Audience Growth (2/5 Width) */}
          <div className="lg:col-span-2 h-full">
            <motion.div variants={itemVariants} className="h-full">
              <Card className="bg-zinc-950 text-white border border-zinc-900 shadow-sm rounded-2xl p-5 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Audience Growth
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                        Live
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2 leading-relaxed">
                    Your community grew by 150 members this week.
                  </p>
                </div>

                {/* Custom animated graph bars matching mockup exactly */}
                <div className="flex items-end justify-between h-20 pt-4 gap-2.5">
                  {[
                    { h: "35%", active: false },
                    { h: "50%", active: false },
                    { h: "65%", active: false },
                    { h: "45%", active: false },
                    { h: "85%", active: true }, // Highlighted bar in mockup
                    { h: "35%", active: false }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: bar.h }}
                        transition={{ delay: 0.3 + idx * 0.05, duration: 0.6, ease: "easeOut" }}
                        className={`w-full rounded-t-[4px] ${
                          bar.active 
                            ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]" 
                            : "bg-zinc-800"
                        }`}
                      />
                    </div>
                  ))}
                </div>
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
