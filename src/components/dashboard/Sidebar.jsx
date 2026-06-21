"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Button } from "@heroui/react"; // Using latest Hero UI components
import { authClient } from "@/lib/auth-client";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Heart,
  BarChart3,
  Settings,
  PlusCircle,
  HelpCircle,
  LogOut,
  Users,
  FileText,
  CreditCard,
  Utensils,
} from "lucide-react";

export default function Sidebar({ role, user, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = role === "admin";

  const handleLogout = async () => {
    await authClient.signOut();
    onClose?.();
    router.push("/");
    router.refresh();
  };

  // Active Link Styling Matrix matching your images
  const linkStyle = (path) =>
    pathname === path
      ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-[#10B981] text-white font-medium shadow-sm transition-all"
      : "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium transition-all";

  const adminLinks = [
    { href: "/dashboard/admin/overview", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/admin/recipes", label: "Manage Recipes", icon: UtensilsCrossed },
    { href: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/admin/reports", label: "Reports", icon: FileText },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: CreditCard },
    { href: "/dashboard/profile", label: "Settings", icon: Settings },
  ];

  const userLinks = [
    { href: "/dashboard/user/overview", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/user/my-recipes", label: "My Recipes", icon: UtensilsCrossed },
    { href: "/dashboard/user/favorites", label: "Favorites", icon: Heart },
    { href: "/dashboard/user/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/profile", label: "Settings", icon: Settings },
  ];

  const currentLinks = isAdmin ? adminLinks : userLinks;

  return (
    <div className="h-full flex flex-col justify-between p-4 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 select-none">
      {/* ─── TOP SECTION ─── */}
      <div className="space-y-6">
        {/* Logo Block & Theme Toggle */}
        <div className="flex items-center justify-between px-2 pt-2">
          <Link href="/" onClick={() => onClose?.()} className="flex items-center gap-2 cursor-pointer">
            {!isAdmin && <Utensils className="text-[#046A38]" size={24} />}
            <span className="text-xl font-bold text-[#046A38] tracking-tight">
              RecipeHub
            </span>
          </Link>
          <ThemeSwitcher />
        </div>

        {/* ADMIN SPECIFIC: Profile card at the top */}
        {isAdmin && (
          <div className="flex items-center gap-3 p-2 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <Avatar
              src={
                user?.image ||
                "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"
              }
              className="w-10 h-10 ring-2 ring-offset-2 ring-[#10B981] dark:ring-offset-zinc-900"
              color="success"
            />
            <div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {user?.name || "Chef de Cuisine"}
              </p>
              <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                Admin Member
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Navigation Links Array */}
        <nav className="flex flex-col space-y-1">
          {currentLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onClose?.()}
                className={linkStyle(link.href)}
              >
                <Icon size={20} /> <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ─── BOTTOM SECTION (COMMON UTILITIES & ACTION BUTTON) ─── */}
      <div className="space-y-4 pt-4">
        {/* Action Button matching your exact green fill */}
        <Link href="/dashboard/user/add-recipe" className="block" onClick={() => onClose?.()}>
          <Button className="w-full bg-[#00693E] hover:bg-[#005230] text-white font-semibold py-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
            <PlusCircle size={18} />
            <span>Create New Recipe</span>
          </Button>
        </Link>

        {/* Global Support Links */}
        <div className="flex flex-col space-y-1 border-t border-zinc-100 dark:border-zinc-900 pt-3">
          <Link
            href="/help"
            onClick={() => onClose?.()}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-all"
          >
            <HelpCircle size={18} /> <span>Help Center</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all text-left w-full cursor-pointer"
          >
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>

        {/* USER SPECIFIC: Profile card at the very bottom */}
        {!isAdmin && (
          <div className="flex items-center gap-3 p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800">
            <Avatar
              src={
                user?.image ||
                "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"
              }
              className="w-10 h-10 ring-2 ring-offset-2 ring-[#10B981] dark:ring-offset-zinc-900"
              color="success"
            />
            <div>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {user?.name || "Chef de Cuisine"}
              </p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                {user?.isPremium ? "PREMIUM MEMBER" : "FREE MEMBER"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
