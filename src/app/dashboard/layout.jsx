// এখানে কিন্তু 'use client' থাকবে না, এটি একটি Server Component
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }) {
  // আপনার বানানো ফাংশন দিয়ে সরাসরি সার্ভারেই সেশন চেক করা হচ্ছে
  const user = await getUserSession();

  // ইউজার লগইন করা না থাকলে সরাসরি লগইন পেজে রিডাইরেক্ট করবে
  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}
