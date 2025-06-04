import { addDays, convertDateToIso, currentDate } from "@/lib/date";
import type { Habit } from "@/model/habit/habit";
import { HabitService } from "@/model/habit/habit-service";
import { LocalStorageHabitRepository } from "@/model/habit/local-storage-habit-repository";

export function seedHabits() {
	const service = new HabitService(new LocalStorageHabitRepository());

	const today = currentDate();

	const newHabits = [
		{
			name: "Yesterday Habit",
			schedule: {
				startDate: convertDateToIso(addDays(today, -1)),
				repeat: undefined,
			},
		},
		{
			name: "No Repeat Habit",
			schedule: {
				startDate: convertDateToIso(today),
				repeat: undefined,
			},
		},
		{
			name: "Daily Habit Forever",
			schedule: {
				startDate: convertDateToIso(today),
				repeat: {
					type: "day",
					everyNumberOfDays: 1,
					duration: { type: "forever" },
				},
			},
		},
		{
			name: "Daily Habit Every Other Day",
			schedule: {
				startDate: convertDateToIso(today),
				repeat: {
					type: "day",
					everyNumberOfDays: 2,
					duration: { type: "forever" },
				},
			},
		},
		{
			name: "Daily Habit For 3 Day",
			schedule: {
				startDate: convertDateToIso(today),
				repeat: {
					type: "day",
					everyNumberOfDays: 1,
					duration: {
						type: "untilDate",
						endDate: convertDateToIso(addDays(today, 2)),
					},
				},
			},
		},
		{
			name: "Daily Habit For 2 Occurrences",
			schedule: {
				startDate: convertDateToIso(today),
				repeat: {
					type: "day",
					everyNumberOfDays: 1,
					duration: {
						type: "afterOccurrences",
						count: 2,
					},
				},
			},
		},
		{
			name: "Daily Habit Every Other Day Starting From Next Day",
			schedule: {
				startDate: convertDateToIso(addDays(today, 1)),
				repeat: {
					type: "day",
					everyNumberOfDays: 2,
					duration: { type: "forever" },
				},
			},
		},
		{
			name: "Weekly Habit Forever on Mon, Wed, Fri",
			schedule: {
				startDate: convertDateToIso(today),
				repeat: {
					type: "week",
					everyNumberOfWeeks: 1,
					daysOfWeek: ["monday", "wednesday", "friday"],
					duration: { type: "forever" },
				},
			},
		},
		{
			name: "Weekly Habit Until Date on Sun",
			schedule: {
				startDate: convertDateToIso(today),
				repeat: {
					type: "week",
					everyNumberOfWeeks: 1,
					daysOfWeek: ["sunday"],
					duration: {
						type: "untilDate",
						endDate: convertDateToIso(addDays(today, 14)),
					},
				},
			},
		},
		{
			name: "Habit Every 2 Weeks For 3 Occurrences on Sat",
			schedule: {
				startDate: convertDateToIso(today),
				repeat: {
					type: "week",
					everyNumberOfWeeks: 2,
					daysOfWeek: ["saturday"],
					duration: {
						type: "afterOccurrences",
						count: 3,
					},
				},
			},
		},
	];

	for (const habit of newHabits) {
		service.addHabit(habit as Habit);
	}
}
