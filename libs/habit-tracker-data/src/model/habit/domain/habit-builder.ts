import { generateID } from "#model/common/domain/entity";
import { Habit } from "#model/habit/domain/habit";
import { HabitSchedule } from "#model/habit/domain/habit-schedule";
import {
	HabitScheduleDayRepeat,
	HabitScheduleWeekRepeat,
} from "#model/habit/domain/habit-schedule-repeat";
import {
	HabitScheduleDurationAfterOccurrences,
	HabitScheduleDurationForever,
	HabitScheduleDurationUntilDate,
} from "#model/habit/domain/habit-schedule-repeat-duration";
import { startOfToday, WEEKDAYS, type DateType } from "@repo/date";

export class HabitBuilder {
	private id: string;
	private name = "";
	private startDate = startOfToday();
	private repeat: HabitScheduleDayRepeat | HabitScheduleWeekRepeat | null =
		null;

	private scheduleId: string;

	constructor() {
		this.scheduleId = generateID();
		this.id = generateID();
	}

	withId(id: string): this {
		this.id = id;
		return this;
	}

	withName(name: string): this {
		this.name = name;
		return this;
	}

	withStartDate(date: DateType): this {
		this.startDate = date;
		return this;
	}

	withDailyRepeat(everyNumberOfDays = 1): this {
		this.repeat = new HabitScheduleDayRepeat({
			scheduleId: this.scheduleId,
			duration: new HabitScheduleDurationForever(),
			everyNumberOfDays,
		});
		return this;
	}

	withWeeklyRepeat(everyNumberOfWeeks = 1, daysOfWeek = [...WEEKDAYS]): this {
		this.repeat = new HabitScheduleWeekRepeat({
			scheduleId: this.scheduleId,
			duration: new HabitScheduleDurationForever(),
			everyNumberOfWeeks,
			daysOfWeek,
		});
		return this;
	}

	withDurationUntil(date: DateType): this {
		if (!this.repeat) throw new Error("Set repeat before setting duration");
		this.repeat.duration = new HabitScheduleDurationUntilDate({
			endDate: date,
		});
		return this;
	}

	withDurationAfter(occurrences: number): this {
		if (!this.repeat) throw new Error("Set repeat before setting duration");
		this.repeat.duration = new HabitScheduleDurationAfterOccurrences({
			afterOccurrences: occurrences,
		});
		return this;
	}

	build(): Habit {
		const schedule = new HabitSchedule({
			habitId: this.id,
			startDate: this.startDate,
			repeat: this.repeat,
		});

		return Habit.create({
			id: this.id,
			name: this.name,
			schedule,
		});
	}
}
