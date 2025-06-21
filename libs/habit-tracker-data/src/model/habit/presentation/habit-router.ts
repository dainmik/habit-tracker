import { HabitInputSchema } from "#model/habit/application/habit-input-model";
import { publicProcedure, router } from "#trpc/server/server";
import { parseISO } from "@repo/date";
import { z } from "zod";

export const habitRouter = router({
	get: publicProcedure
		.input(z.string())
		.query(({ ctx, input }) => ctx.habitService.getHabit(input)),

	getAll: publicProcedure
		.input(z.string())
		.query(({ ctx, input }) => ctx.habitService.getHabits(parseISO(input))),

	getDue: publicProcedure
		.input(z.string().transform((input) => parseISO(input)))
		.query(({ ctx, input }) => ctx.habitService.getHabitsDueOnDate(input)),

	add: publicProcedure
		.input(HabitInputSchema)
		.mutation(async ({ ctx, input }) => {
			await ctx.habitService.addHabit(input);
		}),

	edit: publicProcedure
		.input(
			z.object({
				id: z.string(),
				habit: HabitInputSchema,
			}),
		)
		.mutation(({ ctx, input }) =>
			ctx.habitService.editHabit(input.id, input.habit),
		),

	delete: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			await ctx.habitService.deleteHabit(input.id);
		}),

	toggleStatus: publicProcedure
		.input(
			z.object({
				id: z.string(),
				date: z.string().transform((d) => parseISO(d)),
			}),
		)
		.mutation(({ ctx, input }) =>
			ctx.habitService.toggleStatus(input.id, input.date),
		),

	toggleCompletion: publicProcedure
		.input(
			z.object({
				id: z.string(),
				date: z.string().transform((d) => parseISO(d)),
			}),
		)
		.mutation(({ ctx, input }) =>
			ctx.habitService.toggleCompletion(input.id, input.date),
		),

	canToggleCompletion: publicProcedure
		.input(
			z.object({
				id: z.string(),
				date: z.string().transform((d) => parseISO(d)),
			}),
		)
		.query(({ ctx, input }) =>
			ctx.habitService.canToggleCompletion(input.id, input.date),
		),

	canToggleStatus: publicProcedure
		.input(
			z.object({
				id: z.string(),
				date: z.string().transform((d) => parseISO(d)),
			}),
		)
		.query(({ ctx, input }) =>
			ctx.habitService.canToggleStatus(input.id, input.date),
		),
});
