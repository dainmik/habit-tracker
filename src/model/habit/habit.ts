import {
	currentDate,
	isAfter,
	isBefore,
	isSameDay,
	isToday,
	parseISO,
	startOfDay,
	startOfToday,
	type DateType,
} from "@/lib/date";
import { Entity } from "@/model/entity";
import {
	ToggleHabitCompletionError,
	ToggleHabitStatusError,
} from "@/model/habit/errors";
import type { HabitPersistenceModel } from "@/model/habit/habit-persistence-model";
import { HabitRecord } from "@/model/habit/habit-record";
import {
	HabitStatusChange,
	type HabitStatus,
} from "@/model/habit/habit-status-change";

export type Weekday =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";

export type Duration =
	| { type: "forever" }
	| { type: "untilDate"; endDate: string }
	| { type: "afterOccurrences"; count: number };

interface BaseRepeat {
	duration: Duration;
}

export interface DayRepeat extends BaseRepeat {
	type: "day";
	everyNumberOfDays: number;
}

export interface WeekRepeat extends BaseRepeat {
	type: "week";
	everyNumberOfWeeks: number;
	daysOfWeek: Weekday[];
}

export type Repeat = DayRepeat | WeekRepeat;

export interface HabitSchedule {
	startDate: string;
	repeat?: Repeat;
}

export class Habit extends Entity {
	name: string;
	schedule: HabitSchedule;
	createdAt: DateType;
	private records: HabitRecord[];
	private statusChanges: HabitStatusChange[];

	constructor(name: string, schedule: HabitSchedule) {
		super();
		this.name = name;
		this.schedule = schedule;
		this.createdAt = currentDate();
		this.records = [];
		this.statusChanges = [];
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

		const existingStatusChangeForDate = this.statusChanges.find(
			(item) => item.date.toISOString() === date.toISOString(),
		);
		if (existingStatusChangeForDate) {
			existingStatusChangeForDate.status = nextStatus;
		} else {
			this.statusChanges.push(new HabitStatusChange(this.id, date, nextStatus));
		}
	}

	toggleCompletion(date: DateType) {
		if (!this.canToggleCompletion(date)) {
			throw new ToggleHabitCompletionError({
				habitId: this.id,
				date,
			});
		}

		const existing = this.records.find((r) => isSameDay(r.date, date));
		if (existing) {
			existing.completed = !existing.completed;
		} else {
			this.records.push(new HabitRecord(this.id, date, true));
		}
	}

	getRecord(date: DateType) {
		return this.records.find((r) => isSameDay(r.date, date));
	}

	getCompleted(date: DateType) {
		return !!this.getRecord(date)?.completed;
	}

	getStatusOn(date: DateType) {
		// Default to active, find most recent status change on/before date
		const relevantChanges = this.statusChanges
			.filter((sc) => sc.date <= date)
			.sort((a, b) => b.date.getTime() - a.date.getTime());

		return relevantChanges[0]?.status ?? "active";
	}

	canToggleCompletion(date: DateType) {
		const latestStatus = this.statusChanges
			.filter((s) => s.habitId === this.id)
			.filter((s) => s.date <= date)
			.sort((a, b) => b.date.getTime() - a.date.getTime())[0];

		const isNotFutureDate = !isAfter(date, startOfToday());

		if (!latestStatus) {
			return isNotFutureDate;
		}

		return isNotFutureDate && latestStatus.status === "active";
	}

	canToggleStatus(date: DateType) {
		const today = startOfToday();
		const target = startOfDay(date);

		return isToday(target) || isAfter(target, today);
	}

	wasHabitCompleted(date: DateType) {
		if (!isBefore(date, startOfToday())) {
			return true;
		}

		const record = this.getRecord(date);

		return !!record?.completed;
	}

	toDTO(): HabitPersistenceModel {
		return {
			id: this.id,
			name: this.name,
			schedule: this.schedule,
			createdAt: this.createdAt.toISOString(),
			records: this.records.map((r) => r.toDTO()),
			statusChanges: this.statusChanges.map((s) => s.toDTO()),
		};
	}

	static fromDTO = (dto: HabitPersistenceModel) => {
		// This breaks encapsulation slightly by assigning habit.records and habit.statusChanges, but it’s contained within the factory and justified for rehydration.
		const habit = new Habit(dto.name, dto.schedule);
		habit.id = dto.id;
		habit.createdAt = parseISO(dto.createdAt);
		habit.records = dto.records.map((record) => HabitRecord.fromDTO(record));
		habit.statusChanges = dto.statusChanges.map((statusChange) =>
			HabitStatusChange.fromDTO(statusChange),
		);
		return habit;
	};
}
