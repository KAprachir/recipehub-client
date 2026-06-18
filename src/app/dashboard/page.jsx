// src/app/dashboard/page.jsx
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // আপনার সার্ভার অ্যাকশন দিয়ে ইউজার সেশন চেক করা হচ্ছে
  const user = await getUserSession();

  // ১. ইউজার যদি লগইন করা না থাকে, তবে তাকে সোজা লগইন পেজে পাঠান
  if (!user) {
    redirect("/login");
  }

  // ২. ইউজার যদি অ্যাডমিন (Admin) হয়, তবে অ্যাডমিন ওভারভিউতে পাঠান
  if (user.role === "admin") {
    redirect("/dashboard/admin/overview");
  }

  // ৩. ইউজার যদি সাধারণ বা প্রিমিয়াম ইউজার হয়, তবে ইউজার ওভারভিউতে পাঠান
  redirect("/dashboard/user/overview");
}
