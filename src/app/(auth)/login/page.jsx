"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Mail, Lock, LogIn, ChefHat } from "lucide-react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/client";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // google signIn
  const authClient = createAuthClient();
  const googleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin + "/",
      });
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError("Failed to initiate Google login. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      // 1. Check if Better Auth returned an invalid credential error
      if (error) {
        console.error("Login error from Better Auth:", error.message);
        setError(
          error.message || "Invalid email or password. Please try again.",
        );
        // Stop execution here so they stay on the login page
        return;
      }

      // 2. If successful, navigate and refresh the router to update the Navbar
      router.push("/");
      router.refresh();
    } catch (err) {
      // 3. Catch unexpected network errors or crashes
      console.error("Authentication login failure:", err);
      setError("An unexpected connection error occurred. Please try again.");
    } finally {
      // 4. Turn off loading state regardless of outcome
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-linear-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 flex flex-col items-center justify-center p-4 selection:bg-[#046A38]/20 selection:text-[#046A38]">
      {/* Brand Identity Header Block */}
      <div className="flex flex-col items-center text-center mb-6 space-y-2">
        <div className="w-12 h-12 bg-[#046A38] text-white rounded-xl flex items-center justify-center shadow-md">
          <ChefHat size={26} className="stroke-[2.25]" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
          RecipeHub
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
          Access your professional culinary workspace.
        </p>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-neutral-100/50 dark:border-neutral-800/50 p-6 md:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {/* Email Address Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-neutral-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="chef@recipehub.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-11 pl-10 pr-4 text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:border-[#046A38] focus:ring-1 focus:ring-[#046A38] transition-all"
              />
            </div>
          </div>

          {/* Password Input with Embedded "Forgot?" Link */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-[#046A38] hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-neutral-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-11 pl-10 pr-4 text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-hidden focus:border-[#046A38] focus:ring-1 focus:ring-[#046A38] transition-all"
              />
            </div>
          </div>

          {/* Keep Me Logged In Checkbox Options Wrapper */}
          <div className="flex items-center py-1">
            <label className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 cursor-pointer select-none">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded-sm border-neutral-300 text-[#046A38] focus:ring-[#046A38] cursor-pointer accent-[#046A38]"
              />
              <span>Keep me logged in for 30 days</span>
            </label>
          </div>

          {/* Submit Action Control */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-[#046A38] text-white font-semibold h-11 rounded-xl hover:bg-[#03542C] transition-colors shadow-sm text-sm mt-2 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Login</span>
            {!isLoading && <LogIn size={16} className="stroke-[2.5]" />}
          </Button>
        </form>

        {/* Dynamic Contextual OR Segment Splitter */}
        <div className="flex items-center">
          <div className="flex-grow border-t border-neutral-100 dark:border-neutral-800"></div>
          <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-neutral-400 bg-white dark:bg-neutral-900 z-10">
            OR
          </span>
          <div className="flex-grow border-t border-neutral-100 dark:border-neutral-800"></div>
        </div>

        {/* Alternate Federated Provider Google Trigger Button */}
        <Button
          variant="bordered"
          className="w-full border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 font-semibold h-11 rounded-xl bg-transparent text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          onPress={() => googleSignIn()}
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.99 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.92-2.75 3.49-4.51 6.76-4.51Z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.58l3.76 2.91c2.2-2.03 3.69-5.02 3.69-8.64Z"
            />
            <path
              fill="#FBBC05"
              d="M5.24 14.53c-.24-.72-.38-1.5-.38-2.31s.14-1.59.38-2.31L1.39 6.92C.5 8.71 0 10.7 0 12s.5 3.29 1.39 5.08l3.85-2.55Z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.76-2.91c-1.1.74-2.51 1.18-4.2 1.18-3.27 0-5.84-1.76-6.76-4.51L1.39 16.4C3.37 20.33 7.35 23 12 23Z"
            />
          </svg>
          <span>Continue with Google</span>
        </Button>
      </div>

      {/* Alternate Router Entry Redirection Prompt */}
      <p className="mt-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-[#046A38] font-bold hover:underline transition-all ml-1"
        >
          Register
        </Link>
      </p>
    </main>
  );
}
