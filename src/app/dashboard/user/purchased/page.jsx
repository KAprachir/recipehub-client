"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Input, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
// 💡 BACKEND CALL: Import the API query helper once you implement it inside src/lib/api/recipes.js:
import { getUserPurchasedRecipes } from "@/lib/api/recipes";
import {
  Search,
  BookOpen,
  Star,
  Download,
  ChefHat,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function UserPurchasedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchPurchasedRecipes = async () => {
      try {
        setLoading(true);
        const data = await getUserPurchasedRecipes();
        if (data && Array.isArray(data)) {
          setRecipes(data);
        } else {
          setRecipes([]);
        }
      } catch (err) {
        console.error("Error loading purchased recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedRecipes();
  }, []);

  // Filter recipes based on search
  const filteredRecipes = recipes.filter(
    (recipe) =>
      (recipe.recipeName || recipe.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.authorName || recipe.creator?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.category || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // 💡 SERVER INTEGRATION STEP 2:
  // Hook up your download logic (e.g. download PDF or receipt)
  const handleDownloadCard = (recipeId) => {
    console.log("Downloading card for recipe ID:", recipeId);
    // Replace with a trigger to get the PDF card:
    // window.open(`/api/recipes/${recipeId}/download`, '_blank');
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
              My Purchased Recipes
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Access your unlocked gourmet blueprints and exclusive chef instructions.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-64">
            <div className="relative flex items-center flex-1">
              <Search size={16} className="absolute left-3 text-zinc-400" />
              <input
                type="text"
                placeholder="Search purchased recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 text-xs bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-800/85 focus:outline-hidden focus:border-[#046A38] focus:ring-1 focus:ring-[#046A38]/50 transition-all shadow-2xs"
              />
            </div>
          </div>
        </motion.div>

        {/* ─── RECIPES GRID ─── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((placeholder) => (
              <Card key={placeholder} className="h-96 p-4 space-y-4 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl animate-pulse">
                <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-900 rounded-xl" />
                <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-900 rounded-md" />
                <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-900 rounded-md" />
                <div className="flex items-center justify-between mt-auto">
                  <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-900 rounded-lg" />
                  <div className="h-8 w-24 bg-zinc-200 dark:bg-zinc-900 rounded-lg" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {filteredRecipes.length > 0 ? (
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredRecipes.map((recipe) => {
                  const recipeId = recipe._id || recipe.id;
                  const displayTitle = recipe.recipeName || recipe.title || "Untitled Recipe";
                  const displayImage = recipe.recipeImage || recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
                  const displayAuthorName = recipe.authorName || recipe.creator?.name || "Anonymous Chef";
                  const displayAuthorAvatar = recipe.authorImage || recipe.creator?.avatar || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c";
                  const displayDuration = recipe.preparationTime ? `${recipe.preparationTime} mins` : (recipe.duration || "N/A");
                  const displayDifficulty = recipe.difficultyLevel || recipe.difficulty || "Medium";
                  const displayRating = recipe.rating || 4.8;
                  const displayReviewsCount = recipe.reviewsCount || 100;
                  const displayCategory = recipe.category || "General";

                  return (
                    <motion.div
                      key={recipeId}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl overflow-hidden flex flex-col justify-between h-[420px] group">
                        
                        {/* Image Top Frame */}
                        <div className="relative h-44 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                          <img
                            src={displayImage}
                            alt={displayTitle}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="text-[9px] font-black uppercase tracking-wider text-white bg-zinc-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1 shadow-xs">
                              <Sparkles size={10} className="text-amber-400 stroke-[2.5]" />
                              Unlocked
                            </span>
                          </div>
                          <span className="absolute bottom-3 right-3 text-[9px] font-bold text-white bg-zinc-950/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/5">
                            {displayCategory}
                          </span>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Chef Row */}
                            <div className="flex items-center gap-2 mb-2.5">
                              <img
                                src={displayAuthorAvatar}
                                alt={displayAuthorName}
                                className="w-5 h-5 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                              />
                              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                By {displayAuthorName}
                              </span>
                            </div>

                            <h2 className="text-sm font-black text-zinc-900 dark:text-white group-hover:text-[#046A38] dark:group-hover:text-emerald-400 transition-colors line-clamp-1 leading-snug">
                              {displayTitle}
                            </h2>

                            {/* Quick details */}
                            <div className="flex items-center gap-3.5 mt-3 text-[10px] font-bold text-zinc-500">
                              <div className="flex items-center gap-1">
                                <Clock size={12} className="text-zinc-400" />
                                <span>{displayDuration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ChefHat size={12} className="text-zinc-400" />
                                <span>{displayDifficulty}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star size={12} className="text-amber-400 fill-amber-400 stroke-none" />
                                <span className="text-zinc-900 dark:text-zinc-300">{displayRating}</span>
                                <span className="text-zinc-400 font-medium">({displayReviewsCount})</span>
                              </div>
                            </div>
                          </div>

                          {/* Card bottom actions row */}
                          <div className="border-t border-zinc-100 dark:border-zinc-900/60 pt-4 mt-4 flex items-center justify-between gap-3 shrink-0">
                            <button
                              onClick={() => handleDownloadCard(recipeId)}
                              className="p-2 text-zinc-400 hover:text-[#046A38] dark:hover:text-emerald-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                              title="Download PDF Card"
                            >
                              <Download size={15} />
                            </button>
                            
                            <Link href={`/recipes/${recipeId}`} className="flex-1">
                              <Button
                                size="sm"
                                className="w-full bg-emerald-50 dark:bg-emerald-950/20 text-[#046A38] dark:text-emerald-400 font-bold text-[10px] uppercase rounded-xl hover:bg-[#046A38] hover:text-white dark:hover:bg-emerald-500 dark:hover:text-zinc-950 transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-1 h-9"
                              >
                                <span>Cook Now</span>
                                <ArrowRight size={12} />
                              </Button>
                            </Link>
                          </div>
                        </div>

                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-20 flex flex-col items-center justify-center text-center max-w-sm mx-auto"
              >
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/35 border border-zinc-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-600 rounded-2xl mb-4">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  No Purchased Recipes Found
                </h3>
                <p className="text-[10px] text-zinc-400 mt-2 leading-relaxed">
                  Try checking your search filters or browse our catalog of premium blueprints to unlock new cook cards.
                </p>
                <Link href="#" className="mt-4">
                  <Button
                    size="sm"
                    className="bg-[#046A38] dark:bg-emerald-500 text-white dark:text-zinc-950 font-bold text-[10px] uppercase rounded-xl px-5 h-9 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                  >
                    Browse Recipes
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
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
