"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import { LogOut, ChefHat, Menu, X } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Browse Recipes", href: "/recipes" },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-100 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section: Mobile Menu Trigger + Brand Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-neutral-700 dark:text-neutral-300 p-1 cursor-pointer focus:outline-none"
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
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-[#046A38] font-semibold"
                      : "text-neutral-600 font-medium hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  }`}
                >
                  {item.label}
                </Link>
                {/* Visual active line indicator */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#046A38] rounded-full" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Right Section: Dynamic Target Area */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          {isPending ? (
            /* Prevent Layout Flashing while verifying auth state */
            <div className="h-10 px-4 flex items-center">
              <Spinner
                size="sm"
                classnames={{
                  circle1: "border-b-[#046A38]",
                  circle2: "border-b-[#046A38]",
                }}
              />
            </div>
          ) : user ? (
            /* User Logged In Status (Buttons Side-by-Side) */
            <div className="flex items-center gap-3">
              {/* Dashboard Button: Fixed by wrapping in Link */}
              <Link href="/dashboard">
                <Button
                  variant="flat"
                  className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-semibold cursor-pointer"
                >
                  Dashboard
                </Button>
              </Link>

              {/* Logout is an action, not a link, so it stays as just a Button */}
              <Button
                color="danger"
                variant="flat"
                onPress={handleLogout}
                startContent={<LogOut size={16} />}
                className="font-semibold cursor-pointer"
              >
                Log Out
              </Button>
            </div>
          ) : (
            /* User Logged Out Status */
            <>
              {/* Login Button: Fixed by wrapping in Link */}
              <Link href="/login" className="hidden sm:inline-flex">
                <Button
                  variant="light"
                  className="text-neutral-700 dark:text-neutral-300 font-medium cursor-pointer"
                >
                  Login
                </Button>
              </Link>

              {/* Register Button: Fixed by wrapping in Link */}
              <Link href="/register">
                <Button className="bg-[#046A38] text-white font-medium shadow-sm hover:bg-[#03542C] transition-colors cursor-pointer">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Responsive Drawer Panel (Mobile) */}
      {isMenuOpen && (
        <div className="sm:hidden w-full border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-4 space-y-3 absolute top-16 left-0 shadow-lg z-50">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={`w-full block py-2 px-3 text-base rounded-md ${
                    pathname === item.href
                      ? "text-[#046A38] font-semibold bg-[#046A38]/5"
                      : "text-neutral-700 font-medium dark:text-neutral-300"
                  }`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {!isPending && !user && (
            <div className="flex flex-col gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
              {/* Mobile Login Button: Fixed by wrapping in Link */}
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full"
              >
                <Button
                  variant="bordered"
                  className="w-full text-neutral-700 dark:text-neutral-300 border-neutral-200 cursor-pointer"
                >
                  Login
                </Button>
              </Link>

              {/* Mobile Register Button: Fixed by wrapping in Link */}
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-full"
              >
                <Button className="w-full bg-[#046A38] text-white hover:bg-[#03542C] cursor-pointer">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
