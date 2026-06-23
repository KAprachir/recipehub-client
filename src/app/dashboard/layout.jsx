export const dynamic = 'force-dynamic';

import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }) {
  // Checking session directly on the server using custom function
  const user = await getUserSession();

  // Redirect to login page if user is not logged in
  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}
