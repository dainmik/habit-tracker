import type { DateType } from "@repo/date";

export const HABIT_SCHEDULE_DURATION = [
	"forever",
	"untilDate",
	"afterOccurrences",
] as const;

// Class is used as a marker.
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class HabitScheduleDurationForever {}

export class HabitScheduleDurationUntilDate {
	endDate: DateType;

	constructor({ endDate }: { endDate: DateType }) {
		this.endDate = endDate;
	}
}

export class HabitScheduleDurationAfterOccurrences {
	afterOccurrences: number;

	constructor({ afterOccurrences }: { afterOccurrences: number }) {
		this.afterOccurrences = afterOccurrences;
	}
}
export type HabitScheduleDuration =
	| HabitScheduleDurationUntilDate
	| HabitScheduleDurationAfterOccurrences
	| HabitScheduleDurationForever;
