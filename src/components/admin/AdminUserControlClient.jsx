"use client";
import React, { useState } from "react";
import { Avatar, Button } from "@heroui/react";
import { ShieldAlert, UserCheck, ShieldX } from "lucide-react";
import Swal from "sweetalert2";

// ডাটাবেজ থেকে ডাটা লোড না হওয়া পর্যন্ত ব্যাকআপ হিসেবে ডেমো ডাটা (ইমেজের হুবহু ডাটা)
const MOCK_USERS = [
  {
    _id: "1",
    name: "Alex Rivera",
    email: "alex.r@culinarypro.com",
    role: "Admin",
    status: "Active",
    joinedDate: "Jan 12, 2024",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  },
  {
    _id: "2",
    name: "Sarah Chen",
    email: "s.chen@gastronomy.org",
    role: "Recipe Editor",
    status: "Active",
    joinedDate: "Feb 05, 2024",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    _id: "3",
    name: "Mike Ross",
    email: "mike.ross@firm-logistics.com",
    role: "Viewer",
    status: "Blocked",
    joinedDate: "Nov 22, 2023",
    image: "",
  },
  {
    _id: "4",
    name: "Jane Doe",
    email: "jane.doe@web-kitchen.com",
    role: "Recipe Editor",
    status: "Active",
    joinedDate: "Mar 15, 2024",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  },
];

export default function AdminUserControlClient({ initialUsers }) {
  const [users, setUsers] = useState(
    initialUsers?.length > 0 ? initialUsers : MOCK_USERS,
  );

  // ইউজার ব্লক/আনব্লক করার অ্যাকশন মেথড
  const handleToggleStatus = async (userId, currentStatus, userName) => {
    const isBlocking = currentStatus === "Active";

    Swal.fire({
      title: isBlocking ? `Block ${userName}?` : `Unblock ${userName}?`,
      text: isBlocking
        ? "This user will lose immediate access to their dashboard."
        : "This user will regain full platform access.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isBlocking ? "#EF4444" : "#00693E",
      confirmButtonText: isBlocking ? "Yes, Block User" : "Yes, Unblock User",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const newStatus = isBlocking ? "Blocked" : "Active";

          // ব্যাকএন্ডে PATCH/PUT রিকোয়েস্ট পাঠানোর জায়গা
          // await fetch(`/api/users/${userId}/status`, { method: "PATCH", body: JSON.stringify({ status: newStatus }) });

          // অপটিমিস্টিক স্টেট আপডেট (ডাটা সাথে সাথে স্ক্রিনে বদলে যাবে)
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, status: newStatus } : user,
            ),
          );

          Swal.fire(
            isBlocking ? "Blocked! 🛑" : "Unblocked! 🎉",
            `${userName} has been successfully ${newStatus.toLowerCase()}.`,
            "success",
          );
        } catch (error) {
          Swal.fire("Error", "Failed to update user status.", "error");
        }
      }
    });
  };

  // রোল অনুযায়ী ডাইনামিক কালার চিপস জেনারেটর
  const getRoleBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400";
      case "recipe editor":
        return "bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-400";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-xs">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse select-none">
          {/* Table Head Section */}
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200/60 dark:border-zinc-800/80">
              <th className="p-4 text-xs font-bold text-zinc-500 tracking-wider uppercase">
                User Details
              </th>
              <th className="p-4 text-xs font-bold text-zinc-500 tracking-wider uppercase">
                Email Address
              </th>
              <th className="p-4 text-xs font-bold text-zinc-500 tracking-wider uppercase">
                Role
              </th>
              <th className="p-4 text-xs font-bold text-zinc-500 tracking-wider uppercase">
                Account Status
              </th>
              <th className="p-4 text-xs font-bold text-zinc-500 tracking-wider uppercase text-center">
                Administrative Actions
              </th>
            </tr>
          </thead>

          {/* Table Body Section */}
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {users.map((user) => {
              const isActive = user.status === "Active";

              return (
                <tr
                  key={user._id}
                  className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  {/* Column 1: User Details */}
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={
                          user.image ||
                          "https://images.unsplash.com/photo-1577219491135-ce391730fb2c"
                        }
                        className="w-10 h-10 ring-2 ring-zinc-100 dark:ring-zinc-900"
                      />
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                          {user.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          Joined {user.joinedDate || "Recent"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Email Address */}
                  <td className="p-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {user.email}
                  </td>

                  {/* Column 3: Role Chip */}
                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md capitalize ${getRoleBadgeStyle(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Column 4: Account Status */}
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-500"}`}
                      />
                      <span
                        className={`text-sm font-bold ${isActive ? "text-emerald-700 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>

                  {/* Column 5: Administrative Action Button */}
                  <td className="p-4 whitespace-nowrap text-center">
                    {isActive ? (
                      /* Block Action: Soft red background with red text */
                      <Button
                        size="sm"
                        onClick={() =>
                          handleToggleStatus(user._id, user.status, user.name)
                        }
                        className="bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 dark:text-red-400 font-bold px-5 rounded-lg transition-all"
                      >
                        Block User
                      </Button>
                    ) : (
                      /* Unblock Action: Solid recipehub dark green background with white text */
                      <Button
                        size="sm"
                        onClick={() =>
                          handleToggleStatus(user._id, user.status, user.name)
                        }
                        className="bg-[#00693E] hover:bg-[#005230] text-white font-bold px-5 rounded-lg shadow-xs transition-all"
                      >
                        Unblock User
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
