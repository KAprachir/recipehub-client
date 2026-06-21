'use client'

import { authClient } from '@/lib/auth-client'

// ধরি আপনার src/lib/auth-client.js ফাইলে Better-Auth এর ক্লায়েন্ট সেটআপ করা আছে

export const useAuth = () => {
  // Better-Auth এর অফিশিয়াল ক্লায়েন্ট হুক ব্যবহার করা হলো
  const { data: session, isPending, error } = authClient.useSession()

  // অন্য কম্পোনেন্টে ব্যবহারের জন্য ডাটাগুলো রিটার্ন করা হলো
  return {
    user: session?.user
      ? {
          ...session.user,
          isPremium: session.user.role === "premium",
        }
      : null, // ইউজারের নাম, ইমেইল, রোল, ইমেজ ইত্যাদি থাকবে এখানে
    session: session, // ফুল সেশন অবজেক্ট
    loading: isPending, // ডাটা লোড হচ্ছে কিনা ট্র্যাকিং করার জন্য
    error: error // কোনো এরর থাকলে তা ধরার জন্য
  }
}
