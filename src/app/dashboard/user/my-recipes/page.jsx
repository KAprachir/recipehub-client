"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit2,
  Trash2,
  BookOpen,
  FileText,
  UtensilsCrossed,
} from "lucide-react";

export default function MyRecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock recipe data matching the design exactly
  const mockRecipes = [
    {
      id: 1,
      name: "Pan-Seared Sea Bass",
      category: "Seafood",
      badge: "Featured",
      badgeColor: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
      timeAgo: "Updated 2 days ago",
      status: "Published",
      statusColor: "bg-emerald-500",
    },
    {
      id: 2,
      name: "Hand-Pulled Papparde",
      category: "Pasta",
      badge: "Draft",
      badgeColor: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700",
      image: "https://images.unsplash.com/photo-1554978991-33ef7f31d658?auto=format&fit=crop&w=600&q=80",
      timeAgo: "Last edit 4h ago",
      status: "Drafting",
      statusColor: "bg-zinc-400",
    },
    {
      id: 3,
      name: "Wild Berry Pavlova",
      category: "Dessert",
      badge: "Active",
      badgeColor: "bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-900/50",
      image: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=600&q=80",
      timeAgo: "Published 1 week ago",
      status: "Published",
      statusColor: "bg-emerald-500",
    },
  ];

  // Filtering based on search query
  const filteredRecipes = mockRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants for container cascading
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
              My Culinary Portfolio
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage and refine your shared recipes.
            </p>
          </div>
          <Button
            as={Link}
            href="/dashboard/user/add-recipe"
            className="bg-[#046A38] hover:bg-[#03542C] text-white font-bold h-11 px-5 rounded-xl shadow-md transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Plus size={18} className="stroke-[3]" />
            <span>Create New Recipe</span>
          </Button>
        </motion.div>

        {/* ─── METRICS GRID ─── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Total Recipes Published */}
          <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-[#046A38] dark:text-emerald-400 rounded-xl">
                  <BookOpen size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">
                  +12%
                </span>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Total Recipes Published
                </p>
                <p className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
                  42
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Drafts */}
          <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 rounded-xl">
                  <FileText size={20} />
                </div>
                <span className="text-xs font-bold text-zinc-500 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-200/40 dark:border-zinc-800/60">
                  Stable
                </span>
              </div>
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Drafts
                </p>
                <p className="text-3xl font-black text-zinc-900 dark:text-white mt-1">
                  08
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Culinary Impact */}
          <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <Card className="p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between relative overflow-hidden h-full">
              <div className="absolute right-4 bottom-4 text-zinc-100 dark:text-zinc-900 pointer-events-none opacity-30">
                <UtensilsCrossed size={72} className="stroke-[1.5]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Culinary Impact
                </p>
                <p className="text-base font-bold text-zinc-900 dark:text-white mt-1.5">
                  1.2k Saves this month
                </p>
              </div>
              <div className="mt-6 space-y-1 z-10">
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    className="bg-[#046A38] h-full rounded-full" 
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* ─── SEARCH & FILTER CONTROLS ─── */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="flex-1 relative flex items-center">
            <Search size={18} className="absolute left-3.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search your recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-800/85 focus:outline-hidden focus:border-[#046A38] focus:ring-1 focus:ring-[#046A38]/50 transition-all shadow-2xs"
            />
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              variant="bordered"
              className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 font-semibold h-11 rounded-xl flex items-center gap-2 px-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-xs cursor-pointer shadow-2xs"
            >
              <SlidersHorizontal size={14} className="text-zinc-500" />
              <span>Filter</span>
            </Button>
            <Button
              variant="bordered"
              className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 font-semibold h-11 rounded-xl flex items-center gap-2 px-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-xs cursor-pointer shadow-2xs"
            >
              <Plus size={14} className="text-zinc-500 rotate-45" />
              <span>Latest First</span>
            </Button>
          </div>
        </motion.div>

        {/* ─── RECIPES CARD GRID ─── */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2"
        >
          {filteredRecipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
            >
              <Card className="shadow-sm border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 overflow-hidden rounded-2xl flex flex-col group h-full transition-shadow duration-300 hover:shadow-md">
                {/* Image & Badge Container */}
                <div className="relative h-44 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${recipe.badgeColor}`}>
                    {recipe.badge}
                  </span>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#046A38] dark:text-emerald-500 uppercase tracking-wider">
                      {recipe.category}
                    </span>
                    <h3 className="text-sm font-black text-zinc-950 dark:text-white tracking-tight leading-snug group-hover:text-[#046A38] dark:group-hover:text-emerald-400 transition-colors">
                      {recipe.name}
                    </h3>
                    <p className="text-[10px] text-zinc-400 mt-1 font-medium">
                      {recipe.timeAgo}
                    </p>
                  </div>

                  {/* Footer Controls */}
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-900/60 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${recipe.statusColor}`} />
                      <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">
                        {recipe.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1.5 text-zinc-400 hover:text-[#046A38] dark:hover:text-emerald-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                        title="Edit Recipe"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                        title="Delete Recipe"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Action Card: Draft New Concept */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full"
          >
            <Link href="/dashboard/user/add-recipe" className="block h-full cursor-pointer">
              <div className="h-full border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-[#046A38] dark:hover:border-emerald-500 bg-zinc-50/50 dark:bg-zinc-950/20 hover:bg-zinc-50 dark:hover:bg-zinc-950/60 rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-all duration-300 min-h-[300px] group shadow-2xs">
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-sm text-zinc-400 group-hover:text-[#046A38] dark:group-hover:text-emerald-400 transition-colors mb-3">
                  <Plus size={20} className="stroke-[2.5]" />
                </div>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  Draft New Concept
                </p>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Quick start recipe builder
                </p>
              </div>
            </Link>
          </motion.div>
        </motion.div>
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
