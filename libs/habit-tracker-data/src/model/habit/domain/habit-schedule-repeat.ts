import { Entity } from "#model/common/domain/entity";
import type { Weekday } from "@repo/date";
import type { HabitScheduleDuration } from "./habit-schedule-repeat-duration.ts";

interface HabitScheduleWeekRepeatProps {
	scheduleId: string;
	duration: HabitScheduleDuration;
	everyNumberOfWeeks: number;
	daysOfWeek: Weekday[];
}

export class HabitScheduleWeekRepeat extends Entity {
	scheduleId: string;
	duration: HabitScheduleDuration;
	everyNumberOfWeeks: number;
	daysOfWeek: Weekday[];

	constructor({
		scheduleId,
		duration,
		everyNumberOfWeeks,
		daysOfWeek,
	}: HabitScheduleWeekRepeatProps) {
		super();
		this.scheduleId = scheduleId;
		this.duration = duration;
		this.everyNumberOfWeeks = everyNumberOfWeeks;
		this.daysOfWeek = daysOfWeek;
	}
}

interface HabitScheduleDayRepeatProps {
	scheduleId: string;
	duration: HabitScheduleDuration;
	everyNumberOfDays: number;
}

export class HabitScheduleDayRepeat extends Entity {
	scheduleId: string;
	duration: HabitScheduleDuration;
	everyNumberOfDays: number;

	constructor({
		scheduleId,
		duration,
		everyNumberOfDays,
	}: HabitScheduleDayRepeatProps) {
		super();
		this.scheduleId = scheduleId;
		this.duration = duration;
		this.everyNumberOfDays = everyNumberOfDays;
	}
}

export type Repeat = HabitScheduleDayRepeat | HabitScheduleWeekRepeat;
