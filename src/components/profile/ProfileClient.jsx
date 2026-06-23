"use client";
import React, { useState } from "react";
import { Card, Input, Button, Avatar } from "@heroui/react";
import {
  Utensils,
  Star,
  Users,
  Save,
  Trash2,
  Link as LinkIcon,
  PenTool,
} from "lucide-react";
import Swal from "sweetalert2";
import { updateProfile } from "@/lib/actions/user";

export default function ProfileClient({ user }) {
  // Form states (values from the database will be set as default)
  const [displayName, setDisplayName] = useState(
    user?.name || "Chef de Cuisine",
  );
  const [image, setImage] = useState(
    user?.image || "https://example.com/your-avatar.jpg",
  );
  const [isSaving, setIsSaving] = useState(false);

  // Reset or discard handler
  const handleDiscard = () => {
    setDisplayName(user?.name || "Chef de Cuisine");
    setImage(user?.image || "https://example.com/your-avatar.jpg");
    Swal.fire(
      "Changes Discarded",
      "Form has been reset to original values.",
      "info",
    );
  };

  // Save changes handler
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);

      const payload = { displayName, profileUrl: image };

      // Server action or server mutation will be called here
      await updateProfile(payload);

      Swal.fire("Success 🎉", "Profile updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update profile.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 text-zinc-800 dark:text-zinc-200">
      {/* ─── HEADER AREA ─── */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          Profile Management
        </h1>
        <p className="text-sm text-zinc-500">
          Manage your professional culinary identity and recipe portfolio
          settings.
        </p>
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-6">
        {/* ─── TOP SECTION: DUAL-COLUMN GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side: Profile Image Showcase */}
          <Card className="md:col-span-1 p-6 flex flex-col items-center justify-center bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl min-h-[300px]">
            <div className="relative group cursor-pointer mb-4">
              <Avatar
                src={
                  image.startsWith("http")
                    ? image
                    : "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"
                }
                className="w-36 h-36 ring-4 ring-zinc-100 dark:ring-zinc-900 shadow-md text-large"
              />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Profile Image
            </p>
            <p className="text-[11px] text-zinc-400 mt-1 italic">
              Recommended: 400×400px
            </p>
          </Card>

          {/* Right Side: Identity Settings Form */}
          <Card className="md:col-span-2 p-6 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs rounded-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Display Name Input Unit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold tracking-tight text-zinc-700 dark:text-zinc-300">
                    Display Name
                  </label>
                  {user?.isPremium && (
                    <span className="text-[9px] font-black tracking-wider uppercase bg-amber-500 text-black px-2 py-0.5 rounded-md shadow-2xs font-sans">
                      ★ Premium Chef
                    </span>
                  )}
                </div>
                <Input
                  type="text"
                  variant="bordered"
                  size="lg"
                  className="font-medium text-zinc-800"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  endcontent={<PenTool size={16} className="text-zinc-400" />}
                />
              </div>

              {/* Profile Image URL Input Unit */}
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-tight text-zinc-700 dark:text-zinc-300">
                  Profile Image URL
                </label>
                <Input
                  type="text"
                  variant="bordered"
                  size="lg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  endcontent={<LinkIcon size={16} className="text-zinc-400" />}
                />
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Connect your professional Gravatar or a custom hosted image
                  URL.
                </p>
              </div>
            </div>

            {/* Form Call-To-Action Operations Row */}
            <div className="flex items-center justify-end gap-4 pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-900">
              <Button
                type="button"
                variant="light"
                className="font-semibold text-zinc-500 hover:text-zinc-800 px-6 rounded-xl"
                onClick={handleDiscard}
              >
                Discard
              </Button>
              <Button
                type="submit"
                isLoading={isSaving}
                className="bg-[#00693E] hover:bg-[#005230] text-white font-bold px-6 py-6 rounded-xl flex items-center gap-2 shadow-sm transition-all"
              >
                {!isSaving && <Save size={16} />}
                <span>Save Changes</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* ─── BOTTOM SECTION: THREE SPECIFICATIONS METRICS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Box 1: Shared Recipes */}
          <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs flex items-center gap-4 rounded-xl">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-[#00693E] dark:text-emerald-400 rounded-xl">
              <Utensils size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Shared Recipes
              </p>
              <p className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">
                {user?.sharedRecipesCount || 142}
              </p>
            </div>
          </Card>

          {/* Box 2: Reputation Status */}
          <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs flex items-center gap-4 rounded-xl">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400 rounded-xl">
              <Star size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Reputation
              </p>
              <p className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">
                {user?.reputation || "4.9/5"}
              </p>
            </div>
          </Card>

          {/* Box 3: Total Followers Counter */}
          <Card className="p-4 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 shadow-xs flex items-center gap-4 rounded-xl">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 rounded-xl">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Followers
              </p>
              <p className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">
                {user?.followersCount || "8.4k"}
              </p>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
