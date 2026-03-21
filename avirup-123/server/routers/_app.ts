import { router } from "../trpc";
import { helloRouter } from "./hello";
import { profileRouter } from "./profile";

/**
 * Root application router.
 * Add new sub-routers here as your app grows.
 */
export const appRouter = router({
  hello: helloRouter,
  profile: profileRouter,
});

export type AppRouter = typeof appRouter;
