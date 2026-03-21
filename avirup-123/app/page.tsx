import { HydrateClient } from "@/lib/trpc/server";
import { HelloCard } from "@/components/HelloCard";

export default function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Next.js 14 + tRPC
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              App Router · TypeScript · Tailwind CSS · tRPC · Supabase
            </p>
          </div>
          <HelloCard />
        </div>
      </main>
    </HydrateClient>
  );
}
