"use client";
import React from "react";
import Link from "next/link";
import { Card, Button, Avatar } from "@heroui/react";
import { Clock, Tag, Globe, Heart, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function HomeRecipeSections({
  featuredRecipes = [],
  popularRecipes = [],
}) {
  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ─── FEATURED RECIPES SECTION ─── */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-100 dark:border-neutral-900 pb-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
              <Star size={14} className="fill-current" /> Admin&apos;s Pick
            </span>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
              Featured Culinary Creations
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Handpicked premium recipes curated by our professional editing staff.
            </p>
          </div>
          <Link
            href="/recipes"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-4 md:mt-0"
          >
            <span>Browse all recipes</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {featuredRecipes.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-900/40 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-500">
            <p className="text-sm font-semibold">No featured recipes yet.</p>
            <p className="text-xs text-neutral-400 mt-1">
              Check back later or browse other recipes.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredRecipes.map((recipe) => (
              <motion.div
                key={recipe._id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Card className="h-full bg-white dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/80 shadow-xs overflow-hidden flex flex-col hover:shadow-lg transition-all rounded-3xl">
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={recipe.recipeImage}
                      alt={recipe.recipeName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#046A38] text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                      Featured
                    </div>
                  </div>
                  {/* Content Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug line-clamp-1">
                        {recipe.recipeName}
                      </h3>
                      {/* Meta Pills */}
                      <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                        <span className="flex items-center gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 px-2 py-0.5 rounded-lg border border-amber-100 dark:border-amber-900/50">
                          <Tag size={10} /> <span>{recipe.category}</span>
                        </span>
                        <span className="flex items-center gap-1 bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 px-2 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900/50">
                          <Globe size={10} /> <span>{recipe.cuisineType}</span>
                        </span>
                        <span className="flex items-center gap-1 bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 px-2 py-0.5 rounded-lg border border-neutral-200/50 dark:border-neutral-800">
                          <Clock size={10} />{" "}
                          <span>{recipe.preparationTime} mins</span>
                        </span>
                      </div>
                    </div>
                    {/* View Details Link */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-neutral-400">
                        By {recipe.authorName}
                      </span>
                      <Button
                        as={Link}
                        href={`/recipes/${recipe._id}`}
                        size="sm"
                        className="bg-[#046A38] text-white font-bold rounded-xl"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* ─── POPULAR RECIPES SECTION ─── */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-100 dark:border-neutral-900 pb-5">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
              <Heart size={14} className="fill-current" /> Community Favorites
            </span>
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
              Trending & Popular Recipes
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              The highest rated and most liked recipes shared by the RecipeHub
              community.
            </p>
          </div>
        </div>

        {popularRecipes.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-900/40 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-500">
            <p className="text-sm font-semibold">No popular recipes yet.</p>
            <p className="text-xs text-neutral-400 mt-1">
              Be the first to share a masterpiece!
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {popularRecipes.map((recipe) => (
              <motion.div
                key={recipe._id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Card className="h-full bg-white dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800/80 shadow-xs overflow-hidden flex flex-col hover:shadow-lg transition-all rounded-3xl">
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={recipe.recipeImage}
                      alt={recipe.recipeName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Heart size={10} className="fill-current" />{" "}
                      <span>{recipe.likesCount || 0}</span>
                    </div>
                  </div>
                  {/* Content Container */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug line-clamp-1">
                        {recipe.recipeName}
                      </h3>
                      {/* Author row */}
                      <div className="flex items-center gap-2">
                        <Avatar
                          size="sm"
                          src={recipe.authorImage}
                          className="w-5 h-5 shrink-0"
                        />
                        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                          {recipe.authorName || "Chef Hub"}
                        </span>
                      </div>
                    </div>
                    {/* View Details Link */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-neutral-400">
                        {recipe.category}
                      </span>
                      <Button
                        as={Link}
                        href={`/recipes/${recipe._id}`}
                        size="sm"
                        className="bg-[#046A38] text-white font-bold rounded-xl"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
