import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import ProfileClient from "@/components/profile/ProfileClient";

export default async function ProfilePage() {
  const user = await getUserSession();

  // ইউজার সিকিউরিটি চেক
  if (!user) {
    redirect("/login");
  }

  return <ProfileClient user={user} />;
}
