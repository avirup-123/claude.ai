import { router } from "../trpc";
import { helloRouter } from "./hello";

/**
 * Root application router.
 * Add new sub-routers here as your app grows.
 */
export const appRouter = router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
