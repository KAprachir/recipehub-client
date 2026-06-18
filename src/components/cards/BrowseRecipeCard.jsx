"use client";
import React from "react";
import { Card, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Clock, Star, Heart } from "lucide-react";
import Link from "next/link";

export default function BrowseRecipeCard({ recipe }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="shadow-sm border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden flex flex-col h-full rounded-2xl">
        {/* Image Frame with Badges */}
        <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
          <img
            src={
              recipe.recipeImage ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            }
            alt={recipe.recipeName}
            className="w-full h-full object-cover"
          />
          {/* Cuisine Type Overlay */}
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white px-2.5 py-1 rounded-md backdrop-blur-sm">
            {recipe.cuisineType || "Italian"}
          </span>
          {/* Prep Time Badge Overlay */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-semibold bg-black/60 text-white px-2.5 py-1 rounded-md backdrop-blur-sm">
            <Clock size={12} /> <span>{recipe.preparationTime || 30} mins</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-lg leading-snug tracking-tight text-zinc-800 dark:text-zinc-100 line-clamp-1">
                {recipe.recipeName}
              </h3>
              <button className="text-zinc-400 hover:text-red-500 p-0.5 transition-colors">
                <Heart size={18} />
              </button>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-2 leading-relaxed">
              {recipe.instructions
                ? recipe.instructions.length > 120
                  ? recipe.instructions.substring(0, 120) + "..."
                  : recipe.instructions
                : "A culinary masterpiece cooked with finest and fresh handpicked ingredients."}
            </p>
          </div>

          {/* Bottom Call to Actions Area */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
              <Star size={14} fill="currentColor" />
              <span>{recipe.rating || "4.8"}</span>
              <span className="text-zinc-400 font-normal">
                ({recipe.likesCount || 120})
              </span>
            </div>

            <Button
              as={Link}
              href={`/recipes/${recipe._id}`}
              size="sm"
              radius="md"
              className="bg-[#10B981] hover:bg-[#059669] text-white font-bold px-4"
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
