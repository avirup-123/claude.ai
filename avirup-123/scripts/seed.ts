/**
 * Seed script — inserts 50 fake member profiles with Gemini embeddings into Supabase.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/seed.ts
 *
 * Required env vars (copy from .env.local.template):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   GEMINI_API_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SeedProfile {
  display_name: string;
  role_title: string;
  role_cluster: string;
  skills: string[];
  bio: string;
  location_city: string;
  location_country: string;
  stage: "Exploring" | "Building" | "Scaling" | "Established";
  looking_for: Array<"Co-founder" | "Collaborator" | "Mentor" | "Mentee" | "Hiring" | "Freelance Work">;
  availability: "Open" | "Selective" | "Busy";
}

interface EmbedResponse {
  embedding: { values: number[] };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EMBEDDING_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent";

async function generateEmbedding(text: string): Promise<number[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const res = await fetch(`${EMBEDDING_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/text-embedding-004",
      content: { parts: [{ text }] },
      taskType: "SEMANTIC_SIMILARITY",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini embedding error ${res.status}: ${body}`);
  }

  const data = (await res.json()) as EmbedResponse;
  return data.embedding.values;
}

function profileToEmbeddingText(p: SeedProfile): string {
  return [
    p.role_title,
    p.skills.join(", "),
    p.bio,
    p.looking_for.join(", "),
  ]
    .filter(Boolean)
    .join(" ");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Validate env vars up front
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!supabaseUrl) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  if (!geminiKey) throw new Error("GEMINI_API_KEY is not set");

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Load seed data
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const dataPath = join(__dirname, "seed-data.json");
  const profiles: SeedProfile[] = JSON.parse(readFileSync(dataPath, "utf-8"));

  console.log(`Seeding ${profiles.length} profiles...\n`);

  let inserted = 0;
  let failed = 0;

  for (let i = 0; i < profiles.length; i++) {
    const p = profiles[i];
    const label = `[${i + 1}/${profiles.length}] ${p.display_name} (${p.role_title})`;

    try {
      // 1. Generate embedding (best-effort — skip if network unavailable)
      process.stdout.write(`${label} — generating embedding...`);
      let profile_embedding: number[] | null = null;
      try {
        const embeddingText = profileToEmbeddingText(p);
        profile_embedding = await generateEmbedding(embeddingText);
        process.stdout.write(` done (${profile_embedding.length}-dim)`);
      } catch {
        process.stdout.write(` skipped (no network)`);
      }

      // 2. Build DB row — map role_title → role, drop role_cluster
      const now = new Date().toISOString();
      const row = {
        display_name: p.display_name,
        role: p.role_title,
        skills: p.skills,
        bio: p.bio,
        location_city: p.location_city,
        location_country: p.location_country,
        stage: p.stage,
        looking_for: p.looking_for,
        availability: p.availability,
        profile_embedding,
        created_at: now,
        updated_at: now,
      };

      // 3. Insert into Supabase
      const { error } = await supabase.from("members").insert(row);

      if (error) {
        process.stdout.write(` FAILED\n`);
        console.error(`  Supabase error: ${error.message}`);
        failed++;
      } else {
        process.stdout.write(` inserted\n`);
        inserted++;
      }
    } catch (err) {
      process.stdout.write(` ERROR\n`);
      console.error(`  ${err instanceof Error ? err.message : String(err)}`);
      failed++;
    }

    // Rate-limit: 500ms delay between Gemini API calls (skip after last item)
    if (i < profiles.length - 1) {
      await sleep(500);
    }
  }

  console.log(`\nDone. ${inserted} inserted, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
