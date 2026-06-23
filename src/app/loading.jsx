"use client";

import React from "react";
import { ChefHat } from "lucide-react";

export default function LoadingPage() {
  return (
    <main className="min-h-screen w-full flex flex-col flex-1 items-center justify-center p-4 bg-white dark:bg-neutral-950 antialiased selection:bg-[#046A38]/20 selection:text-[#046A38]">
      {/* Main container */}
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Brand logo section */}
        <div className="relative flex items-center justify-center">
          {/* Glowing pulse effect behind the logo */}
          <div className="absolute w-20 h-20 rounded-3xl bg-[#046A38]/10 animate-pulse"></div>

          <div className="w-16 h-16 bg-[#046A38] text-white rounded-2xl flex items-center justify-center shadow-lg z-10">
            <ChefHat size={32} className="stroke-[2.25]" />
          </div>
        </div>

        {/* Text message */}
        <div className="flex flex-col items-center text-center space-y-1">
          <h1 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Preparing Workspace
          </h1>
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Fetching recipes and culinary resources.
          </p>
        </div>

        {/* Standard CSS spinner matching green brand color */}
        <div className="pt-2">
          <div className="w-6 h-6 border-2 border-neutral-200 border-t-[#046A38] rounded-full animate-spin"></div>
        </div>
      </div>
    </main>
  );
}
