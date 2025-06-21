import { convertDateToIso, getDate, WEEKDAYS } from "@repo/date";
import { z } from "zod";

const WeekdaySchema = z.enum(WEEKDAYS);

const DurationSchema = z.discriminatedUnion("type", [
	z.object({ type: z.literal("forever") }),
	z.object({
		type: z.literal("untilDate"),
		endDate: z
			.union([z.string(), z.date()])
			.transform((date) => convertDateToIso(getDate(date as Date))),
	}),
	z.object({
		type: z.literal("afterOccurrences"),
		afterOccurrences: z.coerce.number().int().min(1),
	}),
]);
export type HabitScheduleDurationInputModel = z.infer<typeof DurationSchema>;

export const DayRepeatInputSchema = z.object({
	type: z.literal("day"),
	duration: DurationSchema,
	everyNumberOfDays: z.number().int().min(1).default(1),
});
export type HabitScheduleDayRepeatInputModel = z.infer<
	typeof DayRepeatInputSchema
>;

const WeekRepeatInputSchema = z.object({
	type: z.literal("week"),
	duration: DurationSchema,
	everyNumberOfWeeks: z.number().int().min(1).default(1),
	daysOfWeek: z
		.array(WeekdaySchema)
		.nonempty("Please choose at least one day of the week."),
});
export type HabitScheduleWeekRepeatInputModel = z.infer<
	typeof WeekRepeatInputSchema
>;

const RepeatInput = z.discriminatedUnion("type", [
	DayRepeatInputSchema,
	WeekRepeatInputSchema,
]);
export type HabitScheduleRepeatInputModel =
	| HabitScheduleDayRepeatInputModel
	| HabitScheduleWeekRepeatInputModel;

const HabitScheduleInputSchema = z
	.object({
		startDate: z
			.union([z.string(), z.date()])
			.transform((date) => convertDateToIso(getDate(date as Date))),
		repeat: RepeatInput.nullable().optional(),
	})
	.superRefine((value, ctx) => {
		const repeat = value.repeat;
		if (repeat && repeat.duration.type === "untilDate") {
			const endDate = repeat.duration.endDate;
			if (endDate < value.startDate) {
				ctx.addIssue({
					code: "custom",
					message: "End date must be later than the start date.",
					path: ["repeat", "duration", "endDate"],
				});
			}
		}
	});

export type HabitScheduleInputModel = z.infer<typeof HabitScheduleInputSchema>;

export const HabitInputSchema = z.object({
	name: z.string().trim().min(1, "Name cannot be empty."),
	schedule: HabitScheduleInputSchema,
});

export type HabitInputModel = z.infer<typeof HabitInputSchema>;
