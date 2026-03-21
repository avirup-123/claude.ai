"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";

export function HelloCard() {
  const [name, setName] = useState("World");
  const [inputValue, setInputValue] = useState("World");

  const greet = trpc.hello.greet.useQuery({ name }, { enabled: name.length > 0 });
  const list = trpc.hello.list.useQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName(inputValue);
  };

  return (
    <div className="space-y-6">
      {/* Greeting card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">tRPC Query Demo</h2>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a name"
            className={cn(
              "flex-1 rounded-lg border border-gray-300 dark:border-gray-600",
              "bg-white dark:bg-gray-800 px-3 py-2 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-blue-500"
            )}
          />
          <button
            type="submit"
            className={cn(
              "rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white",
              "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            Greet
          </button>
        </form>

        {greet.isLoading && (
          <p className="text-sm text-gray-500">Loading...</p>
        )}
        {greet.isError && (
          <p className="text-sm text-red-500">{greet.error.message}</p>
        )}
        {greet.data && (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3">
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              {greet.data.message}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              {new Date(greet.data.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* List card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Users List</h2>
        {list.isLoading && <p className="text-sm text-gray-500">Loading...</p>}
        {list.data && (
          <ul className="space-y-2">
            {list.data.map((user) => (
              <li
                key={user.id}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium">
                  {user.id}
                </span>
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
