"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Award, Infinity } from "lucide-react";

const PremiumBanner = () => {
  return (
    <section className="w-full bg-white dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Container Box */}
      <div className="max-w-7xl mx-auto bg-[#2E2E2E] rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
        {/* Left Column: Copywriting & Main Action */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Top Yellow Mini Pill Badge */}
          <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#E5C158] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Go Premium
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.2]">
            Join our Premium <br />
            Community
          </h2>

          <p className="text-sm text-neutral-300 max-w-xl leading-relaxed">
            Unlock unlimited recipe storage, exclusive video masterclasses from
            executive chefs, and a verified Premium badge on your profile.
            Elevate your culinary brand to the next level.
          </p>

          <Button
            as={Link}
            href="/checkout/premium"
            className="bg-[#046A38] text-white font-semibold px-6 h-12 rounded-xl hover:bg-[#03542C] transition-colors shadow-xs text-sm cursor-pointer"
          >
            Start Free Trial
          </Button>
        </div>

        {/* Right Column: Feature Inner Cards Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Card 1: Premium Badge */}
          <div className="bg-[#3D3D3D] border border-neutral-700/30 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="text-[#E5C158]">
              <Award size={24} className="stroke-[2.25]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Premium Badge
              </h3>
              <p className="text-xs text-neutral-400 leading-normal">
                Stand out as a verified culinary expert.
              </p>
            </div>
          </div>

          {/* Card 2: Unlimited Access */}
          <div className="bg-[#3D3D3D] border border-neutral-700/30 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            {/* Soft modern neon emerald green for the access element */}
            <div className="text-[#10B981]">
              <Infinity size={24} className="stroke-[2.25]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Unlimited Access
              </h3>
              <p className="text-xs text-neutral-400 leading-normal">
                No limits on recipe creation or storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumBanner;
