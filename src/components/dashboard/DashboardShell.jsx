"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { Menu, X, ChefHat } from "lucide-react";
import { Avatar } from "@heroui/react";

export default function DashboardShell({ user, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* Mobile Top Header Bar */}
      <header className="md:hidden flex h-16 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-4 flex-shrink-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[#046A38] cursor-pointer">
            <ChefHat size={22} className="stroke-[2.5]" />
            <span className="tracking-tight">RecipeHub Dashboard</span>
          </Link>
        </div>
        <div className="flex items-center">
          <Avatar
            src={
              user?.image ||
              "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"
            }
            className="w-8 h-8 ring-2 ring-[#10B981]"
            color="success"
          />
        </div>
      </header>

      {/* Desktop Sidebar Sidebar Container */}
      <aside className="hidden md:block w-64 h-full flex-shrink-0">
        <Sidebar role={user?.role} user={user} />
      </aside>

      {/* Mobile Overlay Slide-out Sidebar Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop mask layer */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={closeSidebar}
          />
          {/* Mobile sidebar container block */}
          <div className="relative flex w-64 max-w-xs flex-col bg-white dark:bg-zinc-950 h-full shadow-2xl transition-transform duration-300">
            <div className="absolute right-2 top-2 p-2 z-10">
              <button
                onClick={closeSidebar}
                className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="h-full w-full pt-4">
              <Sidebar role={user?.role} user={user} onClose={closeSidebar} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area Scroll Container */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="p-4 md:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}
