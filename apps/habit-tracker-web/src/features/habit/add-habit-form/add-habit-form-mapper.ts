import {
	addMonths,
	convertDateToIso,
	currentDate,
	type DateType,
	type IsoDateString,
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
	startDate: IsoDateString;
	repeatEnabled: boolean;
	repeatKind: "day" | "week";
	repeatEvery: number;
	daysOfWeek: Weekday[];
	durationType: Duration["type"];
	untilDate: IsoDateString;
	occurrenceCount: number;
}

export const habitToForm = (
	habit: HabitViewModel,
	untilDate: DateType,
): HabitForm => {
	const { repeat } = habit;

	const defaultForm: HabitForm = {
		name: habit.name,
		startDate: habit.startDate,
		repeatEnabled: !!repeat,
		repeatKind: "day",
		repeatEvery: 1,
		daysOfWeek: [],
		durationType: "forever",
		untilDate: convertDateToIso(untilDate),
		occurrenceCount: 10,
	};

	if (!repeat) return defaultForm;

	const { duration } = repeat;
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
				? duration.endDate
				: convertDateToIso(currentDate()),
		occurrenceCount: duration.type === "afterOccurrences" ? duration.count : 10,
	};
};

export const formToHabitDTO = (form: HabitForm): HabitInputModel => {
	let repeat: Repeat | undefined = undefined;

	if (form.repeatEnabled) {
		const duration =
			form.durationType === "forever"
				? { type: "forever" }
				: form.durationType === "untilDate"
					? {
							type: "untilDate",
							endDate: form.untilDate,
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
			startDate: form.startDate,
			repeat,
		},
	};
};

export const getEmptyHabitForm = (startDate: DateType): HabitForm => {
	return {
		name: "",
		startDate: convertDateToIso(startDate),
		repeatEnabled: false,
		repeatEvery: 1,
		repeatKind: "day",
		daysOfWeek: [],
		durationType: "forever",
		untilDate: convertDateToIso(addMonths(startDate, 1)),
		occurrenceCount: 10,
	};
};
