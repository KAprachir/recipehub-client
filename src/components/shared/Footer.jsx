"use client";

import React from "react";
import Link from "next/link";
import { ChefHat, Globe, AtSign } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-neutral-100 dark:border-neutral-800">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-[#046A38]"
            >
              <ChefHat size={24} className="stroke-[2.5]" />
              <span>RecipeHub</span>
            </Link>
            <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
              The world's leading platform for professional culinary management
              and community recipe sharing.
            </p>
          </div>

          {/* Links Columns Container */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4 md:justify-items-start">
            {/* Platform Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-wide">
                Platform
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#046A38] transition-colors duration-150 block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-[#046A38] transition-colors duration-150 block"
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#000000] dark:text-neutral-100 tracking-wide">
                Legal
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-[#046A38] transition-colors duration-150 block leading-normal"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-[#046A38] transition-colors duration-150 block"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Rights & Socials Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright String */}
          <p className="text-xs text-neutral-400 text-center sm:text-left">
            &copy; {currentYear} RecipeHub Professional Culinary Systems. All
            rights reserved.
          </p>

          {/* Circular Action Icons Matching image_27b5a5.png */}
          <div className="flex items-center gap-3">
            <a
              href="https://recipehub.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="w-8 h-8 rounded-full bg-[#E6F0EA] dark:bg-[#042A16] text-[#046A38] flex items-center justify-center hover:bg-[#D1E5DA] dark:hover:bg-[#063F21] transition-colors duration-200 cursor-pointer"
            >
              <Globe size={16} className="stroke-[2.25]" />
            </a>
            <a
              href="mailto:support@recipehub.com"
              aria-label="Email Support"
              className="w-8 h-8 rounded-full bg-[#E6F0EA] dark:bg-[#042A16] text-[#046A38] flex items-center justify-center hover:bg-[#D1E5DA] dark:hover:bg-[#063F21] transition-colors duration-200 cursor-pointer"
            >
              <AtSign size={16} className="stroke-[2.25]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
