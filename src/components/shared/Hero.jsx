"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { Utensils } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Typography & Actions Column */}
        <div className="md:col-span-6 space-y-6 text-left order-2 md:order-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 dark:text-neutral-50 tracking-tight leading-[1.15]">
            Elevate Your Culinary <br className="hidden sm:inline" />
            Journey
          </h1>

          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
            Discover a world of professional recipes curated for the modern
            kitchen. From Michelin-star inspirations to high-volume meal prep,
            master every dish with precision and flair.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              as={Link}
              href="/recipes"
              className="bg-[#046A38] text-white font-semibold px-6 h-12 rounded-xl hover:bg-[#03542C] transition-colors shadow-xs inline-flex items-center gap-2 text-sm"
            >
              <span>Browse Recipes</span>
              <Utensils size={16} className="stroke-[2.5]" />
            </Button>

            <Button
              as={Link}
              href="/about"
              variant="bordered"
              className="border-2 border-[#046A38] text-[#046A38] dark:text-[#059652] dark:border-[#059652] font-semibold px-6 h-12 rounded-xl hover:bg-[#046A38]/5 transition-colors bg-transparent text-sm"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Graphical Image Column */}
        <div className="md:col-span-6 order-1 md:order-2 flex justify-center w-full">
          <div className="relative w-full max-w-md md:max-w-xl aspect-4/3 rounded-3xl overflow-hidden shadow-2xl shadow-neutral-900/10 dark:shadow-black/40">
            {/* Replace this placeholder source with your local premium assets or CMS asset reference */}
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200"
              alt="Gourmet seared steak dish with professional culinary presentation"
              fill
              priority
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
            />
            {/* Subtle overlay shading mimicking the cinematic photo mood */}
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
