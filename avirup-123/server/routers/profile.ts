import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { profileSchema } from "@/lib/types";
import { createServerClient } from "@/lib/supabase/server";
import { generateEmbedding, profileToEmbeddingText } from "@/lib/embeddings";

export const profileRouter = router({
  /**
   * Upsert a member profile. If `id` is provided, updates the existing row;
   * otherwise inserts a new one. After saving, generates and stores an embedding.
   */
  upsert: publicProcedure
    .input(
      profileSchema.extend({
        id: z.string().uuid().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase = createServerClient();
      const { id, ...profileData } = input;

      // Build the row — exclude embedding for now
      const row = {
        ...profileData,
        updated_at: new Date().toISOString(),
        ...(id ? {} : { created_at: new Date().toISOString() }),
      };

      let memberId = id;

      if (id) {
        // Update
        const { error } = await supabase
          .from("members")
          .update(row)
          .eq("id", id);

        if (error) throw new Error(`Supabase update error: ${error.message}`);
      } else {
        // Insert
        const { data, error } = await supabase
          .from("members")
          .insert(row)
          .select("id")
          .single();

        if (error) throw new Error(`Supabase insert error: ${error.message}`);
        memberId = data.id as string;
      }

      // Generate embedding asynchronously (fire-and-store).
      // We don't await this on the critical path — if it fails, the profile
      // is still saved and can be re-embedded later.
      generateEmbedding(profileToEmbeddingText(profileData))
        .then((profile_embedding) =>
          supabase
            .from("members")
            .update({ profile_embedding })
            .eq("id", memberId!)
        )
        .catch((err) =>
          console.error(`[embedding] Failed for member ${memberId}:`, err)
        );

      return { id: memberId! };
    }),

  /**
   * Fetch a single member profile by ID.
   */
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const supabase = createServerClient();

      const { data, error } = await supabase
        .from("members")
        .select(
          "id, display_name, role, skills, bio, location_city, location_country, " +
          "stage, looking_for, availability, " +
          "social_linkedin, social_github, social_twitter, social_website, " +
          "created_at, updated_at"
        )
        .eq("id", input.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") return null; // not found
        throw new Error(`Supabase fetch error: ${error.message}`);
      }

      return data;
    }),
});
