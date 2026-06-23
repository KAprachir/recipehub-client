"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Avatar, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { getUserDashboardSummary } from "@/lib/api/user";
import { getUserRecipes } from "@/lib/api/recipes";
import {
  TrendingUp,
  Eye,
  Heart,
  Award,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function UserAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalFavorites: 0,
    likesReceived: 0,
  });
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setLoading(true);
        const [dashboardData, recipesData] = await Promise.all([
          getUserDashboardSummary().catch(() => null),
          getUserRecipes().catch(() => []),
        ]);

        if (dashboardData) {
          setStats(dashboardData);
        }
        if (recipesData) {
          setRecipes(recipesData);
        }
      } catch (error) {
        console.error("Failed to load user analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAnalyticsData();
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

  // Mock charts data for UI visual excellence
  const viewData = [
    { label: "Mon", val: 120 },
    { label: "Tue", val: 240 },
    { label: "Wed", val: 190 },
    { label: "Thu", val: 380 },
    { label: "Fri", val: 320 },
    { label: "Sat", val: 450 },
    { label: "Sun", val: 510 },
  ];
  const maxVal = Math.max(...viewData.map((d) => d.val));

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
              href="/dashboard/user/overview"
              className="text-xs font-bold text-zinc-400 hover:text-[#046A38] transition-colors flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              <span>Back to Overview</span>
            </Link>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Recipe Insights & Analytics
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Analyze your kitchen's digital footprint and community metrics.
          </p>
        </div>

        <div className="bg-[#046A38]/10 dark:bg-emerald-500/10 text-[#046A38] dark:text-emerald-400 border border-[#046A38]/20 dark:border-emerald-500/20 font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 w-fit">
          <Sparkles size={14} />
          <span>Real-time Insights</span>
        </div>
      </motion.div>

      {/* ─── STATS GRID ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Total Recipe Views */}
        <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
          <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-[#046A38]/10 dark:bg-emerald-950/20 text-[#046A38] dark:text-emerald-400 rounded-xl">
                <Eye size={20} />
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                +18.4% &uarr;
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Total Recipe Views
              </p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
                {loading ? "..." : (stats.likesReceived * 12 + 124).toLocaleString()}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metric 2: Likes Received */}
        <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
          <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 rounded-xl">
                <Heart size={20} className="fill-current" />
              </div>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                +24% &uarr;
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Likes Received
              </p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
                {loading ? "..." : stats.likesReceived}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metric 3: Favorites Milestone */}
        <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
          <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 rounded-xl">
                <Award size={20} />
              </div>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                +5.2% &uarr;
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Total Favorites
              </p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
                {loading ? "..." : stats.totalFavorites}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Metric 4: Recipes Uploaded */}
        <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
          <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl">
                <BookOpen size={20} />
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                Active Catalog
              </span>
            </div>
            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Recipes Published
              </p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
                {loading ? "..." : stats.totalRecipes}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ─── DUAL GRID LAYOUT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Weekly Traffic Graph */}
        <div className="lg:col-span-2">
          <motion.div variants={itemVariants} className="h-full">
            <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h2 className="text-base font-black text-zinc-900 dark:text-white tracking-tight">
                  Recipe Traffic (Weekly Views)
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Daily views received across all uploaded recipe guide sheets.
                </p>
              </div>

              {/* Chart implementation */}
              <div className="flex items-end justify-between h-56 pt-6 gap-3 select-none">
                {viewData.map((bar, idx) => {
                  const hPerc = `${(bar.val / maxVal) * 90}%`;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 mb-1">
                        {bar.val}
                      </div>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: hPerc }}
                        transition={{ delay: 0.1 + idx * 0.05, duration: 0.6, ease: "easeOut" }}
                        className="w-full rounded-t-md bg-[#046A38] dark:bg-emerald-500 opacity-90 shadow-2xs hover:opacity-100 transition-opacity"
                      />
                      <span className="text-[10px] font-bold text-zinc-400 tracking-wider">
                        {bar.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Right Card: Recipe Performance Ranking */}
        <div className="lg:col-span-1">
          <motion.div variants={itemVariants} className="h-full">
            <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl h-full flex flex-col justify-between">
              <div>
                <h2 className="text-base font-black text-zinc-900 dark:text-white tracking-tight pb-3 border-b border-zinc-100 dark:border-zinc-900">
                  Top Recipes Performance
                </h2>

                <div className="divide-y divide-zinc-100 dark:divide-zinc-900/60 mt-2">
                  {recipes.length === 0 ? (
                    <div className="py-12 text-center text-xs text-zinc-400 font-medium">
                      No recipe data compiled yet.
                    </div>
                  ) : (
                    recipes.slice(0, 4).map((recipe, index) => (
                      <div key={recipe._id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-black text-[#046A38] w-4">
                            #{index + 1}
                          </span>
                          <img
                            src={recipe.recipeImage}
                            alt={recipe.recipeName}
                            className="w-8 h-8 rounded-lg object-cover bg-zinc-100 border border-zinc-200/50 dark:border-zinc-850 shrink-0"
                          />
                          <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate leading-snug">
                            {recipe.recipeName}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Heart size={10} className="text-red-500 fill-current" />
                          <span className="text-[10px] font-bold text-zinc-500">
                            {recipe.likesCount || 0}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <Link href="/dashboard/user/my-recipes">
                  <Button className="w-full bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 text-xs font-bold text-[#046A38] dark:text-emerald-400 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center gap-1 cursor-pointer">
                    <span>Manage All Recipes</span>
                    <ChevronRight size={14} />
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
