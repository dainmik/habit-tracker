import {
	convertDateToIso,
	currentDate,
	parseISO,
	type HabitDate,
} from "@/lib/date";
import type {
	DayRepeat,
	Duration,
	Repeat,
	Weekday,
	WeekRepeat,
} from "@/model/habit/habit";
import type { HabitInputModel } from "@/model/habit/habit-input-model";
import type { HabitViewModel } from "@/model/habit/habit-view-model";

export interface HabitForm {
	name: string;
	startDate: HabitDate;
	repeatEnabled: boolean;
	repeatKind: "day" | "week";
	repeatEvery: number;
	daysOfWeek: Weekday[];
	durationType: Duration["type"];
	untilDate: HabitDate;
	occurrenceCount: number;
}

export function habitToForm(habit: HabitViewModel): HabitForm {
	const repeat = habit.repeat;

	const defaultForm: HabitForm = {
		name: habit.name,
		startDate: parseISO(habit.startDate),
		repeatEnabled: !!repeat,
		repeatKind: "day",
		repeatEvery: 1,
		daysOfWeek: [],
		durationType: "forever",
		untilDate: currentDate(),
		occurrenceCount: 10,
	};

	if (!repeat) return defaultForm;

	const duration = repeat.duration;
	const durationType = duration.type;

	return {
		...defaultForm,
		repeatKind: repeat.type,
		repeatEvery:
			repeat.type === "day"
				? repeat.everyNumberOfDays
				: repeat.everyNumberOfWeeks,
		daysOfWeek: repeat.type === "week" ? repeat.daysOfWeek : [],
		durationType,
		untilDate:
			duration.type === "untilDate"
				? parseISO(duration.endDate)
				: currentDate(),
		occurrenceCount: duration.type === "afterOccurrences" ? duration.count : 10,
	};
}

export function formToHabitDTO(form: HabitForm): HabitInputModel {
	let repeat: Repeat | undefined = undefined;

	if (form.repeatEnabled) {
		const duration =
			form.durationType === "forever"
				? { type: "forever" }
				: form.durationType === "untilDate"
					? {
							type: "untilDate",
							endDate: convertDateToIso(form.untilDate),
						}
					: {
							type: "afterOccurrences",
							count: form.occurrenceCount,
						};

		repeat =
			form.repeatKind === "day"
				? ({
						type: "day",
						everyNumberOfDays: form.repeatEvery,
						duration,
					} as DayRepeat)
				: ({
						type: "week",
						everyNumberOfWeeks: form.repeatEvery,
						daysOfWeek: form.daysOfWeek,
						duration,
					} as WeekRepeat);
	}

	return {
		name: form.name,
		schedule: {
			startDate: convertDateToIso(form.startDate),
			repeat,
		},
	};
}

export function emptyHabitForm(): HabitForm {
	return {
		name: "",
		startDate: currentDate(),
		repeatEnabled: false,
		repeatEvery: 1,
		repeatKind: "day",
		daysOfWeek: [],
		durationType: "forever",
		untilDate: currentDate(),
		occurrenceCount: 10,
	};
}
