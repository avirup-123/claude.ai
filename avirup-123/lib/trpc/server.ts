import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createTRPCContext } from "@/server/trpc";
import { appRouter } from "@/server/routers/_app";
import { createCallerFactory } from "@trpc/server";
import { makeQueryClient } from "./query-client";

/**
 * Creates a stable getter for the query client that returns the same client
 * during a server-rendering pass.
 */
const getQueryClient = cache(makeQueryClient);

const caller = createCallerFactory(appRouter)(
  // Server-side calls don't have a real NextRequest, so we cast appropriately.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => createTRPCContext({ req: null as any })
);

export const { trpc: serverTrpc, HydrateClient } = createHydrationHelpers<
  typeof appRouter
>(caller, getQueryClient);
