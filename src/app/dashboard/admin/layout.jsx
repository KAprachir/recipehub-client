import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const user = await getUserSession();

  // 1. If not authenticated, redirect to login
  if (!user) {
    redirect("/login");
  }

  // 2. If authenticated but NOT an admin, redirect to the user dashboard
  if (user.role !== "admin") {
    redirect("/dashboard/user/overview");
  }

  return <>{children}</>;
}
