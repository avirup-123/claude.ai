import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const STAGES = ["Exploring", "Building", "Scaling", "Established"] as const;
export const LOOKING_FOR_OPTIONS = [
  "Co-founder",
  "Collaborator",
  "Mentor",
  "Mentee",
  "Hiring",
  "Freelance Work",
] as const;
export const AVAILABILITY_OPTIONS = ["Open", "Selective", "Busy"] as const;

export type Stage = (typeof STAGES)[number];
export type LookingFor = (typeof LOOKING_FOR_OPTIONS)[number];
export type Availability = (typeof AVAILABILITY_OPTIONS)[number];

// ─── Zod Schema ───────────────────────────────────────────────────────────────

export const profileSchema = z.object({
  display_name: z
    .string()
    .min(2, "Display name must be at least 2 characters")
    .max(60, "Display name must be at most 60 characters"),
  role: z.string().min(1, "Please select or enter a role"),
  skills: z
    .array(z.string().min(1))
    .min(3, "Please add at least 3 skills"),
  bio: z
    .string()
    .max(300, "Bio must be at most 300 characters")
    .default(""),
  location_city: z.string().max(80).default(""),
  location_country: z.string().default(""),
  stage: z.enum(STAGES),
  looking_for: z
    .array(z.enum(LOOKING_FOR_OPTIONS))
    .min(1, "Please select at least one option"),
  availability: z.enum(AVAILABILITY_OPTIONS),
  social_linkedin: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  social_github: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  social_twitter: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  social_website: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// ─── Database Row ─────────────────────────────────────────────────────────────

export interface MemberRow extends ProfileFormValues {
  id: string;
  created_at: string;
  updated_at: string;
  profile_embedding?: number[] | null;
}
