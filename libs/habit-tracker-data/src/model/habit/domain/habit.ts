import { Entity } from "#model/common/domain/entity";
import {
	ToggleHabitCompletionError,
	ToggleHabitStatusError,
} from "#model/habit/domain/errors";
import { HabitRecord } from "#model/habit/domain/habit-record";
import type { HabitSchedule } from "#model/habit/domain/habit-schedule";
import {
	HabitScheduleDayRepeat,
	type HabitScheduleWeekRepeat,
} from "#model/habit/domain/habit-schedule-repeat";
import {
	HabitScheduleDurationAfterOccurrences,
	HabitScheduleDurationUntilDate,
} from "#model/habit/domain/habit-schedule-repeat-duration";

import {
	HabitStatusChange,
	type HabitStatus,
} from "#model/habit/domain/habit-status-change";

import {
	addDays,
	addWeeks,
	currentDate,
	differenceInDays,
	isAfter,
	isBefore,
	isSameDay,
	isToday,
	startOfDay,
	startOfToday,
	WEEKDAYS,
	type DateType,
} from "@repo/date";

const getWeekday = (date: Date) =>
	date
		.toLocaleDateString("en-US", { weekday: "long" })
		.toLowerCase() as HabitScheduleWeekRepeat["daysOfWeek"][number];

interface HabitProps {
	id?: string | undefined;
	name: string;
	schedule: HabitSchedule;
}

export class Habit extends Entity {
	name: string;
	schedule: HabitSchedule;
	createdAt: DateType;
	/**
	 * Persistence needs a way to access private properties to persist the entity.
	 * There are a few ways to achieve this. We choose the simplest way, which is to
	 * make all properties public and name the "private" properties with a leading
	 * underscore. Properties with a leading underscore are meant for the persistence
	 * layer only.
	 *
	 * We could eventually use ESLint to enforce them being accessible only from
	 * modules that are in the infrastructure layer (those modules could be identified
	 * either by folder structure, or module name).
	 */
	_records: HabitRecord[];
	_statusChanges: HabitStatusChange[];

	constructor({ id, name, schedule }: HabitProps) {
		super(id);
		this.name = name;
		this.schedule = schedule;
		this.createdAt = currentDate();
		this._records = [];
		this._statusChanges = [];
	}

	static create({ id, name, schedule }: HabitProps) {
		const habit = new Habit({ id, name, schedule });
		return habit;
	}

	canToggleCompletion(date: DateType) {
		const latestStatus = this._statusChanges
			.filter((s) => s.habitId === this.id)
			.filter((s) => s.date <= date)
			.sort((a, b) => b.date.getTime() - a.date.getTime())[0];

		const isNotFutureDate = !isAfter(date, startOfToday());

		if (!latestStatus) {
			return isNotFutureDate;
		}

		return isNotFutureDate && latestStatus.status === "active";
	}

	toggleCompletion(date: DateType) {
		if (!this.canToggleCompletion(date)) {
			throw new ToggleHabitCompletionError({
				habitId: this.id,
				date,
			});
		}

		const existing = this._records.find((r) => isSameDay(r.date, date));
		if (existing) {
			existing.completed = !existing.completed;
		} else {
			this._records.push(new HabitRecord(this.id, date, true));
		}
	}

	wasHabitCompleted(date: DateType) {
		if (!isBefore(date, startOfToday())) {
			return true;
		}

		const record = this.getRecord(date);

		return !!record?.completed;
	}

	getCompleted(date: DateType) {
		return !!this.getRecord(date)?.completed;
	}

	getStatusOn(date: DateType) {
		const relevantChanges = this._statusChanges
			.filter((sc) => sc.date <= date)
			.sort((a, b) => b.date.getTime() - a.date.getTime());

		return relevantChanges[0]?.status ?? "active";
	}

	canToggleStatus(date: DateType) {
		const today = startOfToday();
		const target = startOfDay(date);

		return isToday(target) || isAfter(target, today);
	}

	toggleStatus(date: DateType) {
		if (!this.canToggleStatus(date)) {
			throw new ToggleHabitStatusError({
				habitId: this.id,
				date,
			});
		}

		const currentStatus = this.getStatusOn(date);
		const nextStatus: HabitStatus =
			currentStatus === "active" ? "paused" : "active";

		const existingStatusChangeForDate = this._statusChanges.find(
			(item) => item.date.toISOString() === date.toISOString(),
		);
		if (existingStatusChangeForDate) {
			existingStatusChangeForDate.status = nextStatus;
		} else {
			this._statusChanges.push(
				new HabitStatusChange(this.id, date, nextStatus),
			);
		}
	}

	getRecord(date: DateType) {
		return this._records.find((r) => isSameDay(r.date, date));
	}

	/**
	 * This function will get messy if we need to add more rules.
	 * TODO: Consider refactoring when touching this code.
	 */
	isHabitDueOn(targetDate: DateType) {
		const { repeat } = this.schedule;
		const habitStartDate = this.schedule.startDate;
		const startAndTargetAreSameDay = isSameDay(targetDate, habitStartDate);

		if (isBefore(targetDate, habitStartDate)) {
			return false;
		}

		if (!repeat) {
			return startAndTargetAreSameDay;
		}

		const { duration } = repeat;

		const handleRepeatFrequency = (date: DateType) => {
			if (repeat instanceof HabitScheduleDayRepeat) {
				const dayDifference = differenceInDays(date, habitStartDate);
				return dayDifference % repeat.everyNumberOfDays === 0;
			}
			const weekday = getWeekday(date);
			const repeatWeekdays =
				repeat.daysOfWeek.length > 0 ? repeat.daysOfWeek : WEEKDAYS;

			if (!repeatWeekdays.includes(weekday)) {
				return false;
			}

			const dayDifference = differenceInDays(
				addWeeks(habitStartDate, repeat.everyNumberOfWeeks),
				habitStartDate,
			);

			return dayDifference % repeat.everyNumberOfWeeks === 0;
		};

		if (duration instanceof HabitScheduleDurationUntilDate) {
			const habitEndDate = duration.endDate;
			if (isAfter(targetDate, habitEndDate)) {
				return false;
			}
		}

		if (duration instanceof HabitScheduleDurationAfterOccurrences) {
			let occurrenceCount = 0;
			let currentDate = habitStartDate;
			const maxOccurrences = duration.afterOccurrences;

			while (!isBefore(targetDate, currentDate)) {
				if (handleRepeatFrequency(currentDate)) {
					occurrenceCount++;
					if (isSameDay(currentDate, targetDate)) {
						return true;
					}
					if (occurrenceCount >= maxOccurrences) {
						return false;
					}
				}

				currentDate = addDays(currentDate, 1);
			}

			return false;
		}

		return handleRepeatFrequency(targetDate);
	}
}
