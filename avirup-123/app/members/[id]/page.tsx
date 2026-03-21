import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { cn, formatDate } from "@/lib/utils";
import type { MemberRow } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = { params: { id: string } };

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getMember(id: string): Promise<MemberRow | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("members")
    .select(
      "id, display_name, role, skills, bio, location_city, location_country, " +
      "stage, looking_for, availability, " +
      "social_linkedin, social_github, social_twitter, social_website, " +
      "created_at, updated_at"
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // row not found
    throw new Error(error.message);
  }
  return data as MemberRow;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const member = await getMember(params.id);
  if (!member) return { title: "Member not found" };
  return {
    title: `${member.display_name} — Community`,
    description: member.bio || `${member.display_name} · ${member.role}`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MemberProfilePage({ params }: Props) {
  const member = await getMember(params.id);
  if (!member) notFound();

  const location = [member.location_city, member.location_country]
    .filter(Boolean)
    .join(", ");

  const socialLinks = [
    { href: member.social_linkedin, label: "LinkedIn", icon: LinkedInIcon },
    { href: member.social_github, label: "GitHub", icon: GitHubIcon },
    { href: member.social_twitter, label: "Twitter / X", icon: TwitterIcon },
    { href: member.social_website, label: "Website", icon: GlobeIcon },
  ].filter((s) => !!s.href);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="mx-auto max-w-2xl space-y-6">

        {/* ── Hero Card ──────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            {/* Avatar placeholder */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-2xl font-bold text-white">
              {member.display_name.charAt(0).toUpperCase()}
            </div>

            {/* Availability badge */}
            <AvailabilityBadge availability={member.availability} />
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {member.display_name}
            </h1>
            <p className="mt-0.5 text-sm font-medium text-blue-600 dark:text-blue-400">
              {member.role}
            </p>
            {location && (
              <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                <PinIcon />
                {location}
              </p>
            )}
          </div>

          {member.bio && (
            <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400 whitespace-pre-line">
              {member.bio}
            </p>
          )}

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5",
                    "border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400",
                    "hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ── Details Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard label="Stage">
            <StagePill stage={member.stage} />
          </InfoCard>
          <InfoCard label="Availability">
            <AvailabilityBadge availability={member.availability} inline />
          </InfoCard>
        </div>

        {/* ── Skills ──────────────────────────────────────────────────────── */}
        {member.skills?.length > 0 && (
          <InfoCard label="Skills">
            <div className="flex flex-wrap gap-1.5">
              {member.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs text-gray-700 dark:text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </InfoCard>
        )}

        {/* ── Looking For ─────────────────────────────────────────────────── */}
        {member.looking_for?.length > 0 && (
          <InfoCard label="Open to">
            <div className="flex flex-wrap gap-1.5">
              {member.looking_for.map((opt) => (
                <span
                  key={opt}
                  className="rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-0.5 text-xs text-blue-700 dark:text-blue-400"
                >
                  {opt}
                </span>
              ))}
            </div>
          </InfoCard>
        )}

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <p className="text-center text-xs text-gray-400">
          Member since {formatDate(new Date(member.created_at))}
        </p>

        {/* ── Edit link ───────────────────────────────────────────────────── */}
        <div className="text-center">
          <Link
            href="/profile/edit"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Edit your profile →
          </Link>
        </div>

      </div>
    </main>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm">
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
        {label}
      </p>
      {children}
    </div>
  );
}

function StagePill({ stage }: { stage: string }) {
  const colors: Record<string, string> = {
    Exploring: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
    Building: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    Scaling: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    Established: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  };
  return (
    <span className={cn("rounded-full px-3 py-1 text-sm font-medium", colors[stage] ?? "bg-gray-100 text-gray-700")}>
      {stage}
    </span>
  );
}

function AvailabilityBadge({
  availability,
  inline = false,
}: {
  availability: string;
  inline?: boolean;
}) {
  const config: Record<string, { dot: string; text: string; label: string }> = {
    Open: { dot: "bg-green-500", text: "text-green-700 dark:text-green-400", label: "Open" },
    Selective: { dot: "bg-yellow-400", text: "text-yellow-700 dark:text-yellow-400", label: "Selective" },
    Busy: { dot: "bg-red-500", text: "text-red-700 dark:text-red-400", label: "Busy" },
  };
  const c = config[availability] ?? config["Selective"];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        inline ? "text-sm" : "rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-xs"
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", c.dot)} />
      <span className={cn("font-medium", c.text)}>{c.label}</span>
    </span>
  );
}

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

function PinIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
      <path d="M8 1a4.5 4.5 0 0 1 4.5 4.5c0 2.784-3.26 6.77-4.13 7.797a.5.5 0 0 1-.74 0C6.76 12.27 3.5 8.284 3.5 5.5A4.5 4.5 0 0 1 8 1zm0 3a1.5 1.5 0 1 0 0 3A1.5 1.5 0 0 0 8 4z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
