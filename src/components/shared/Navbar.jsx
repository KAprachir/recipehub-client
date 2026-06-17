"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { LogOut, User, ChefHat, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Mock user state - Flip to null to test out the logged-out state instantly
  const [user, setUser] = useState();

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Browse Recipes", href: "/recipes" },
  ];

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-100 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section: Mobile Menu Trigger + Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-neutral-700 dark:text-neutral-300 p-1 cursor-pointer focus:outline-hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-[#046A38]"
          >
            <ChefHat size={24} className="stroke-[2.5]" />
            <span>RecipeHub</span>
          </Link>
        </div>

        {/* Center Section: Navigation Links */}
        <ul className="hidden sm:flex items-center gap-6 h-full">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={item.href}
                className="relative h-full flex items-center py-2"
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#046A38] font-semibold"
                      : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  }`}
                >
                  {item.label}
                </Link>
                {/* Visual line match for image_282e7c.png */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#046A38] rounded-full" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Right Section: Dynamic Target Area */}
        <div className="flex items-center gap-3">
          {user ? (
            /* User Logged In Status */
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="cursor-pointer focus:outline-hidden transition-transform active:scale-95">
                  <Avatar size="sm" className="border-2 border-[#046A38]">
                    <Avatar.Image src={user.avatar} alt={user.name} />
                    <Avatar.Fallback>
                      {user.name.substring(0, 2).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile_header"
                  className="h-14 gap-2"
                  textValue="Profile Info"
                >
                  <p className="font-semibold text-xs text-neutral-500">
                    Signed in as
                  </p>
                  <p className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
                    {user.email}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  startContent={<User size={16} />}
                  as={Link}
                  href="/dashboard/profile"
                >
                  My Profile
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className="text-danger"
                  startContent={<LogOut size={16} />}
                  onPress={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            /* User Logged Out (No User State - Matches image_282e7c.png Layout) */
            <>
              <Button
                as={Link}
                href="/login"
                variant="light"
                className="hidden sm:inline-flex text-neutral-700 dark:text-neutral-300 font-medium"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                className="bg-[#046A38] text-white font-medium px-5 rounded-lg shadow-xs hover:bg-[#03542C] transition-colors"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Responsive Drawer Panel */}
      {isMenuOpen && (
        <div className="sm:hidden w-full border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-4 space-y-3 absolute top-16 left-0 shadow-lg z-50">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={`w-full block py-2 px-1 text-base font-medium rounded-md ${
                    pathname === item.href
                      ? "text-[#046A38] font-semibold bg-neutral-50 dark:bg-neutral-900"
                      : "text-neutral-700 dark:text-neutral-300"
                  }`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {!user && (
            <div className="flex flex-col gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                className="w-full text-neutral-700 dark:text-neutral-300 border-neutral-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                className="w-full bg-[#046A38] text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
