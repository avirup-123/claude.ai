"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  profileSchema,
  STAGES,
  LOOKING_FOR_OPTIONS,
  AVAILABILITY_OPTIONS,
  type ProfileFormValues,
  type LookingFor,
} from "@/lib/types";
import { trpc } from "@/lib/trpc/client";
import { RoleDropdown } from "./RoleDropdown";
import { SkillsInput } from "./SkillsInput";
import taxonomy from "@/lib/taxonomy.json";

const BIO_MAX = 300;

const SOCIAL_FIELDS = [
  { key: "social_linkedin" as const, label: "LinkedIn", placeholder: "https://linkedin.com/in/yourname" },
  { key: "social_github" as const, label: "GitHub", placeholder: "https://github.com/yourname" },
  { key: "social_twitter" as const, label: "Twitter / X", placeholder: "https://twitter.com/yourname" },
  { key: "social_website" as const, label: "Personal Website", placeholder: "https://yoursite.com" },
] as const;

type FieldErrors = Partial<Record<keyof ProfileFormValues, string>>;

const defaultValues: ProfileFormValues = {
  display_name: "",
  role: "",
  skills: [],
  bio: "",
  location_city: "",
  location_country: "",
  stage: "Exploring",
  looking_for: [],
  availability: "Open",
  social_linkedin: "",
  social_github: "",
  social_twitter: "",
  social_website: "",
};

export function ProfileEditForm({ initialId }: { initialId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<ProfileFormValues>(defaultValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const upsert = trpc.profile.upsert.useMutation({
    onSuccess: ({ id }) => {
      setSubmitted(true);
      router.push(`/members/${id}`);
    },
    onError: (err) => {
      setErrors({ display_name: err.message });
    },
  });

  function set<K extends keyof ProfileFormValues>(key: K, val: ProfileFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleLookingFor(opt: LookingFor) {
    const next = form.looking_for.includes(opt)
      ? form.looking_for.filter((o) => o !== opt)
      : [...form.looking_for, opt];
    set("looking_for", next);
  }

  function validate(): boolean {
    const result = profileSchema.safeParse(form);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof ProfileFormValues;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    upsert.mutate({ ...form, id: initialId });
  }

  const inputBase = cn(
    "w-full rounded-lg border px-3 py-2 text-sm",
    "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
    "focus:outline-none focus:ring-2 focus:ring-blue-500",
    "border-gray-300 dark:border-gray-600"
  );
  const errorInput = "border-red-400 focus:ring-red-400";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">

      {/* ── Section: Basic Info ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          Basic Info
        </h2>

        {/* Display name */}
        <Field label="Display Name" required error={errors.display_name}>
          <input
            type="text"
            value={form.display_name}
            onChange={(e) => set("display_name", e.target.value)}
            placeholder="Jane Doe"
            maxLength={60}
            className={cn(inputBase, errors.display_name && errorInput)}
          />
        </Field>

        {/* Role */}
        <Field label="Role" required error={errors.role}>
          <RoleDropdown
            value={form.role}
            onChange={(v) => set("role", v)}
            error={errors.role}
          />
        </Field>

        {/* Bio */}
        <Field
          label="Bio"
          error={errors.bio}
          hint={
            <span className={cn("text-xs", form.bio.length > BIO_MAX ? "text-red-500" : "text-gray-400")}>
              {form.bio.length} / {BIO_MAX}
            </span>
          }
        >
          <textarea
            value={form.bio}
            onChange={(e) => set("bio", e.target.value)}
            placeholder="Tell the community about yourself…"
            rows={4}
            maxLength={BIO_MAX + 20}
            className={cn(
              inputBase, "resize-none leading-relaxed",
              errors.bio && errorInput
            )}
          />
        </Field>
      </section>

      {/* ── Section: Skills ─────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          Skills
        </h2>
        <Field label="Skills" required error={errors.skills as string}>
          <SkillsInput
            value={form.skills}
            onChange={(v) => set("skills", v)}
            error={errors.skills as string}
          />
        </Field>
      </section>

      {/* ── Section: Location ───────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          Location
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="City" error={errors.location_city}>
            <input
              type="text"
              value={form.location_city}
              onChange={(e) => set("location_city", e.target.value)}
              placeholder="San Francisco"
              className={cn(inputBase, errors.location_city && errorInput)}
            />
          </Field>

          <Field label="Country" error={errors.location_country}>
            <select
              value={form.location_country}
              onChange={(e) => set("location_country", e.target.value)}
              className={cn(
                inputBase, "appearance-none cursor-pointer",
                errors.location_country && errorInput
              )}
            >
              <option value="">Select a country…</option>
              {taxonomy.countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* ── Section: Community ──────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          Community Fit
        </h2>

        {/* Stage */}
        <Field label="Stage" required error={errors.stage}>
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="stage"
                  value={s}
                  checked={form.stage === s}
                  onChange={() => set("stage", s)}
                  className="accent-blue-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{s}</span>
              </label>
            ))}
          </div>
        </Field>

        {/* Availability */}
        <Field label="Availability" required error={errors.availability}>
          <div className="flex flex-wrap gap-2">
            {AVAILABILITY_OPTIONS.map((a) => {
              const colors: Record<string, string> = {
                Open: "checked:accent-green-600",
                Selective: "checked:accent-yellow-500",
                Busy: "checked:accent-red-500",
              };
              return (
                <label key={a} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="availability"
                    value={a}
                    checked={form.availability === a}
                    onChange={() => set("availability", a)}
                    className={cn("accent-blue-600", colors[a])}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{a}</span>
                </label>
              );
            })}
          </div>
        </Field>

        {/* Looking for */}
        <Field label="Looking for" required error={errors.looking_for as string}>
          <div className="flex flex-wrap gap-3">
            {LOOKING_FOR_OPTIONS.map((opt) => {
              const checked = form.looking_for.includes(opt);
              return (
                <label
                  key={opt}
                  className={cn(
                    "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1",
                    "text-sm transition-colors",
                    checked
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                      : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-400"
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleLookingFor(opt)}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
          {errors.looking_for && (
            <p className="mt-1 text-xs text-red-500">{errors.looking_for as string}</p>
          )}
        </Field>
      </section>

      {/* ── Section: Social Links ────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
          Social Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOCIAL_FIELDS.map(({ key, label, placeholder }) => (
            <Field key={key} label={label} error={errors[key]}>
              <input
                type="url"
                value={form[key] ?? ""}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
                className={cn(inputBase, errors[key] && errorInput)}
              />
            </Field>
          ))}
        </div>
      </section>

      {/* ── Submit ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {upsert.isError && (
          <p className="text-sm text-red-500">Something went wrong — please try again.</p>
        )}
        <button
          type="submit"
          disabled={upsert.isPending || submitted}
          className={cn(
            "rounded-lg px-6 py-2.5 text-sm font-semibold text-white",
            "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          )}
        >
          {upsert.isPending ? "Saving…" : "Save Profile"}
        </button>
      </div>
    </form>
  );
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="ml-0.5 text-red-400">*</span>}
        </label>
        {hint}
      </div>
      {children}
      {error && !["role", "skills", "looking_for"].includes(label.toLowerCase()) && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
