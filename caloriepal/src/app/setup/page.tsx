import { SetupForm } from "@/components/setup/SetupForm";

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Set up CaloriePal</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your stats once and we&apos;ll calculate your daily calorie goal.
        </p>
        <SetupForm />
      </div>
    </main>
  );
}
