import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const helloRouter = router({
  greet: publicProcedure
    .input(z.object({ name: z.string().min(1).max(100) }))
    .query(({ input }) => {
      return {
        message: `Hello, ${input.name}!`,
        timestamp: new Date(),
      };
    }),

  list: publicProcedure.query(() => {
    return [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];
  }),
});
