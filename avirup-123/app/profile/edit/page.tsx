import type { Metadata } from "next";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Create or update your community profile.",
};

/**
 * /profile/edit
 *
 * Server component wrapper — keeps the page lightweight. The heavy lifting
 * (form state, tRPC mutations) lives in the client component below.
 *
 * TODO: Pass the authenticated user's existing profile ID (and prefilled data)
 * once Supabase auth is wired up.
 */
export default function ProfileEditPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Your Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Help the community discover you. Fields marked{" "}
            <span className="text-red-400 font-medium">*</span> are required.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <ProfileEditForm />
        </div>
      </div>
    </main>
  );
}
