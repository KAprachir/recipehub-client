"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import {
  User,
  Mail,
  Link2,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    password: "",
  });
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const hasMinLength = formData.password.length >= 6;
  const hasCaseMix =
    /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!hasMinLength || !hasCaseMix) {
      setError("Password must meet all requirements.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.profileImage || undefined,
      });

      if (error) {
        console.error("Registration error from Better Auth:", error.message);
        setError(
          error.message || "Failed to create account. Please try again.",
        );
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Authentication registration failure:", err);
      setError("An unexpected connection error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // google signIn
  const googleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <main className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4 md:p-8 selection:bg-[#046A38]/20 selection:text-[#046A38]">
      <div className="w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left Informative Image Column */}
        <div className="md:col-span-5 relative hidden md:flex flex-col justify-end p-8 text-white overflow-hidden bg-neutral-900">
          <Image
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800"
            alt="Chef preparing a high-end gourmet plate presentation"
            fill
            priority
            className="object-cover opacity-60 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#024021]/95 via-[#046A38]/70 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight leading-tight">
              Master the Art of <br /> Management.
            </h1>
            <p className="text-xs text-neutral-200/90 leading-relaxed max-w-xs">
              Join over 10,000 professional chefs and culinary managers
              organizing the world&apos;s most sophisticated kitchens.
            </p>
          </div>
        </div>

        {/* Right Active Interactive Form Content Area */}
        <div className="md:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Create your account
              </h2>
              <p className="text-xs text-neutral-400">
                Start your professional culinary journey today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {/* Full Name Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-neutral-400">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Chef Auguste Escoffier"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-4 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#046A38]/50 border-none transition-all"
                  />
                </div>
              </div>

              {/* Email Address Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-neutral-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="chef@recipehub.pro"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-4 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#046A38]/50 border-none transition-all"
                  />
                </div>
              </div>

              {/* Profile Image URL Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Profile Image URL (Optional)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-neutral-400">
                    <Link2 size={16} />
                  </span>
                  <input
                    type="url"
                    name="profileImage"
                    placeholder="https://images.unsplash.com/your-photo"
                    value={formData.profileImage}
                    onChange={handleChange}
                    className="w-full h-11 pl-10 pr-4 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#046A38]/50 border-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-neutral-400">
                    <Lock size={16} />
                  </span>
                  <input
                    type={isVisible ? "text" : "password"}
                    name="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full h-11 pl-10 pr-10 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#046A38]/50 border-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute right-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer focus:outline-none"
                  >
                    {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Requirements Validation UI */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2
                      size={13}
                      className={`transition-colors ${hasMinLength ? "text-[#046A38] fill-[#046A38]/10" : "text-neutral-300"}`}
                    />
                    <span
                      className={
                        hasMinLength
                          ? "text-neutral-700 dark:text-neutral-300 font-medium"
                          : "text-neutral-400"
                      }
                    >
                      Minimum 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2
                      size={13}
                      className={`transition-colors ${hasCaseMix ? "text-[#046A38] fill-[#046A38]/10" : "text-neutral-300"}`}
                    />
                    <span
                      className={
                        hasCaseMix
                          ? "text-neutral-700 dark:text-neutral-300 font-medium"
                          : "text-neutral-400"
                      }
                    >
                      one uppercase, one lowercase
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full bg-[#046A38] text-white font-semibold h-11 rounded-lg hover:bg-[#03542C] transition-colors shadow-sm text-sm mt-2 cursor-pointer"
              >
                Register
              </Button>
            </form>

            <div className="flex items-center my-4">
              <div className="grow border-t border-neutral-100 dark:border-neutral-800"></div>
              <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-neutral-400 bg-white dark:bg-neutral-900 z-10">
                OR
              </span>
              <div className="grow border-t border-neutral-100 dark:border-neutral-800"></div>
            </div>

            <Button
              variant="bordered"
              className="w-full border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 font-semibold h-11 rounded-lg bg-transparent text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              onPress={() => googleSignIn()}
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
              >
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

            <p className="text-center text-xs text-neutral-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#046A38] font-bold hover:underline transition-all"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
