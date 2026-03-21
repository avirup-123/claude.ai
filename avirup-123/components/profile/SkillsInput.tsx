"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import taxonomy from "@/lib/taxonomy.json";

const MIN_SKILLS = 3;

interface SkillsInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
  error?: string;
}

export function SkillsInput({ value, onChange, error }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [highlightedIdx, setHighlightedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = inputValue.trim()
    ? taxonomy.skills.filter(
        (s) =>
          s.toLowerCase().includes(inputValue.toLowerCase()) &&
          !value.includes(s)
      )
    : [];

  function addSkill(skill: string) {
    const trimmed = skill.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInputValue("");
    setHighlightedIdx(-1);
    inputRef.current?.focus();
  }

  function removeSkill(skill: string) {
    onChange(value.filter((s) => s !== skill));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (highlightedIdx >= 0 && suggestions[highlightedIdx]) {
        addSkill(suggestions[highlightedIdx]);
      } else if (inputValue.trim()) {
        addSkill(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      // Remove last tag on backspace when input is empty
      removeSkill(value[value.length - 1]);
    } else if (e.key === "Escape") {
      setHighlightedIdx(-1);
      setInputValue("");
    }
  }

  const remaining = Math.max(0, MIN_SKILLS - value.length);

  return (
    <div>
      {/* Tag container + input */}
      <div
        className={cn(
          "flex min-h-[42px] flex-wrap items-center gap-1.5 rounded-lg border px-2.5 py-2",
          "bg-white dark:bg-gray-900 cursor-text",
          "focus-within:ring-2 focus-within:ring-blue-500",
          error
            ? "border-red-400 focus-within:ring-red-400"
            : "border-gray-300 dark:border-gray-600"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((skill) => (
          <span
            key={skill}
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5",
              "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300",
              "text-xs font-medium"
            )}
          >
            {skill}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeSkill(skill);
              }}
              aria-label={`Remove ${skill}`}
              className="ml-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 p-0.5 leading-none"
            >
              ×
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setHighlightedIdx(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            value.length === 0
              ? "Type a skill and press Enter…"
              : value.length < MIN_SKILLS
              ? `Add ${remaining} more…`
              : "Add more skills…"
          }
          className="min-w-[140px] flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
        />
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul
          className={cn(
            "mt-1 max-h-48 overflow-y-auto rounded-lg border",
            "border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-gray-900 shadow-lg z-40 relative"
          )}
        >
          {suggestions.map((s, idx) => (
            <li
              key={s}
              onMouseDown={(e) => {
                e.preventDefault();
                addSkill(s);
              }}
              className={cn(
                "cursor-pointer px-3 py-2 text-sm",
                "hover:bg-blue-50 dark:hover:bg-blue-900/30",
                idx === highlightedIdx &&
                  "bg-blue-50 dark:bg-blue-900/30 font-medium"
              )}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {/* Helper / error */}
      <p className={cn("mt-1 text-xs", error ? "text-red-500" : "text-gray-400")}>
        {error
          ? error
          : remaining > 0
          ? `Add at least ${remaining} more skill${remaining > 1 ? "s" : ""}`
          : `${value.length} skill${value.length !== 1 ? "s" : ""} added · type to search or add custom`}
      </p>
    </div>
  );
}
