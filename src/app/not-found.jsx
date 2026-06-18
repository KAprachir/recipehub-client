"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Home, ArrowLeft, UtensilsCrossed, ChefHat } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-950 overflow-hidden selection:bg-[#046A38]/20 selection:text-[#046A38]">
      {/* Massive Background 404 Typography (Decorative) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
        <h1 className="text-[180px] md:text-[250px] font-black text-neutral-900/[0.03] dark:text-white/[0.02] tracking-tighter">
          404
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center space-y-8">
        {/* Animated Thematic Icon Header */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Outer Glow */}
          <div className="absolute w-28 h-28 rounded-full bg-[#046A38]/10 animate-pulse"></div>

          <div className="w-20 h-20 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl flex items-center justify-center shadow-xl z-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#046A38]/5 to-transparent"></div>
            <UtensilsCrossed size={36} className="text-[#046A38] stroke-[2]" />
          </div>
        </div>

        {/* Copywriting Section */}
        <div className="space-y-4 max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Page Not Found
          </h2>
          <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Oops! It looks like this recipe is missing an ingredient. The page
            you are looking for has been moved, deleted, or never existed.
          </p>
        </div>

        {/* Interactive Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full sm:w-auto">
          <Button
            onPress={() => router.back()}
            variant="flat"
            className="w-full sm:w-auto bg-neutral-200/50 hover:bg-neutral-200 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold h-12 px-6 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={18} className="stroke-[2.5]" />
            <span>Go Back</span>
          </Button>

          <Link
            href="/"
            className="w-full sm:w-auto bg-[#046A38] text-white font-semibold h-12 px-6 rounded-xl hover:bg-[#03542C] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Home size={18} className="stroke-[2.5]" />
            <span>Homepage</span>
          </Link>

          <Link
            href="/recipes"
            variant="bordered"
            className="w-full sm:w-auto border-2 border-neutral-200 dark:border-neutral-800 hover:border-[#046A38] hover:text-[#046A38] dark:hover:border-[#046A38] dark:hover:text-[#046A38] text-neutral-700 dark:text-neutral-300 font-semibold h-12 px-6 rounded-xl bg-transparent transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ChefHat size={18} className="stroke-[2.5]" />
            <span>Browse Recipes</span>
          </Link>
        </div>
      </div>

      {/* Decorative Bottom Gradient (Optional depth) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent dark:from-neutral-950/50 pointer-events-none"></div>
    </main>
  );
}
