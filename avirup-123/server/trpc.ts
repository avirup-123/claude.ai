import { initTRPC, TRPCError } from "@trpc/server";
import { type NextRequest } from "next/server";
import superjson from "superjson";
import { ZodError } from "zod";

/**
 * Context creation — runs for every tRPC request.
 * Extend this to attach session, Supabase client, etc.
 */
export async function createTRPCContext({ req }: { req: NextRequest }) {
  return {
    req,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/** Reusable router and procedure builders */
export const router = t.router;
export const publicProcedure = t.procedure;

/** Protected procedure — throws UNAUTHORIZED if no session */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  // TODO: Replace with real session check, e.g. Supabase auth
  const isAuthenticated = false;
  if (!isAuthenticated) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx });
});
