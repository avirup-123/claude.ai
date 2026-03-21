"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import taxonomy from "@/lib/taxonomy.json";

interface RoleDropdownProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function RoleDropdown({ value, onChange, error }: RoleDropdownProps) {
  const [search, setSearch] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = taxonomy.roles.filter((r) =>
    r.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // If user typed something not in list, allow free-text
        if (search && search !== value) onChange(search);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [search, value, onChange]);

  function select(role: string) {
    onChange(role);
    setSearch(role);
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered.length > 0) {
        select(filtered[0]);
      } else if (search) {
        select(search);
      }
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search or type a role…"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        className={cn(
          "w-full rounded-lg border px-3 py-2 text-sm",
          "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 dark:border-gray-600"
        )}
      />

      {isOpen && (
        <ul
          role="listbox"
          className={cn(
            "absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-lg",
            "border border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-gray-900 shadow-lg"
          )}
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-400">
              No matches — press Enter to use &quot;{search}&quot;
            </li>
          ) : (
            filtered.map((role) => (
              <li
                key={role}
                role="option"
                aria-selected={role === value}
                onMouseDown={() => select(role)}
                className={cn(
                  "cursor-pointer px-3 py-2 text-sm",
                  "hover:bg-blue-50 dark:hover:bg-blue-900/30",
                  role === value && "bg-blue-50 dark:bg-blue-900/30 font-medium"
                )}
              >
                {role}
              </li>
            ))
          )}
        </ul>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
