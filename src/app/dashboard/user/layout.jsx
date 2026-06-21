import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function UserLayout({ children }) {
  const user = await getUserSession();

  // 1. If not authenticated, redirect to login
  if (!user) {
    redirect("/login");
  }

  // 2. Optional: If an admin tries to access standard user pages, redirect them to admin overview
  if (user.role === "admin") {
    redirect("/dashboard/admin/overview");
  }

  return <>{children}</>;
}
