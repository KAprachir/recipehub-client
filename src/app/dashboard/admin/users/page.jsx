import React from "react";
import AdminUserControlClient from "@/components/admin/AdminUserControlClient";
import { getUsers } from "@/lib/api/user";

export default async function AdminUserControlPage() {
  const initialUsers = await getUsers();
  console.log(initialUsers);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
          User Management
        </h1>
        <p className="text-sm text-zinc-500">
          View, monitor, and regulate user account access permissions across
          RecipeHub.
        </p>
      </div>

      {/* Data passed to Client Component */}
      <AdminUserControlClient initialUsers={initialUsers} />
    </div>
  );
}
