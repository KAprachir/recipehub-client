// src/app/dashboard/page.jsx
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // Checking user session using server action
  const user = await getUserSession();

  // 1. If user is not logged in, redirect to login page
  if (!user) {
    redirect("/login");
  }

  // 2. If user is an Admin, redirect to admin overview
  if (user.role === "admin") {
    redirect("/dashboard/admin/overview");
  }

  // 3. If user is a general or premium user, redirect to user overview
  redirect("/dashboard/user/overview");
}
