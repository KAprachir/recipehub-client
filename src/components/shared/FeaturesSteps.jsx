"use client";

import React from "react";
import { FileEdit, Share2, CircleDollarSign } from "lucide-react";

const FeaturesSteps = () => {
  const steps = [
    {
      id: "create",
      title: "Create",
      description:
        "Document your culinary experiments with our precise ingredient and technique trackers.",
      icon: <FileEdit size={24} className="text-white stroke-[2.25]" />,
      // Vibrant custom green icon block background
      bgClass: "bg-[#10B981]",
    },
    {
      id: "share",
      title: "Share",
      description:
        "Publish your high-resolution recipes to an audience of enthusiasts and professionals.",
      icon: <Share2 size={24} className="text-white stroke-[2.25]" />,
      // Deep orange amber block background
      bgClass: "bg-[#F59E0B]",
    },
    {
      id: "earn",
      title: "Earn",
      description:
        "Monetize your expertise through premium recipe tiers and community sponsorships.",
      icon: <CircleDollarSign size={24} className="text-white stroke-[2.25]" />,
      // Corporate dark emerald green background matching the brand
      bgClass: "bg-[#046A38]",
    },
  ];

  return (
    <section className="w-full bg-white dark:bg-neutral-950 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Section */}
        <div className="max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
            Master Your Craft in 3 Steps
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
            A streamlined workflow designed for culinary professionals to scale
            their influence and reach.
          </p>
        </div>

        {/* 3-Column Features Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center group"
            >
              {/* Rounded Rounded Icon Box Wrapper */}
              <div
                className={`w-16 h-16 ${step.bgClass} rounded-2xl flex items-center justify-center shadow-sm transform transition-transform duration-300 group-hover:scale-105 mb-6`}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 tracking-wide">
                {step.title}
              </h3>

              {/* Description Body */}
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSteps;
