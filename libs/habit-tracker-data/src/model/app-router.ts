import { router } from "#trpc/server/server";
import { habitRouter } from "./habit/presentation/habit-router.ts";

export const appRouter = router({
	habits: habitRouter,
});

export type AppRouter = typeof appRouter;
