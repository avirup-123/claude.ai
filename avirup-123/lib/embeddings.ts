import "server-only";

import type { MemberRow } from "@/lib/types";

const EMBEDDING_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent";

interface EmbedResponse {
  embedding: { values: number[] };
}

/**
 * Generates a 768-dimensional embedding vector for the given text
 * using Gemini's text-embedding-004 model.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
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
    throw new Error(`Gemini embedding error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as EmbedResponse;
  return data.embedding.values;
}

/**
 * Builds a plain-text representation of a member profile suitable for embedding.
 * Concatenates: role_title + skills + bio + looking_for
 */
export function profileToEmbeddingText(profile: Omit<MemberRow, "id" | "created_at" | "updated_at" | "profile_embedding">): string {
  return [
    profile.role,
    profile.skills.join(", "),
    profile.bio,
    profile.looking_for.join(", "),
  ]
    .filter(Boolean)
    .join(" ");
}
