import type { DateType } from "@/lib/date";
import { HabitError } from "@/model/error";

interface ToggleHabitStatusErrorParams {
	habitId: string;
	date: DateType;
}

export class ToggleHabitStatusError extends HabitError {
	habitId: string;
	date: DateType;

	constructor({ habitId, date }: ToggleHabitStatusErrorParams) {
		super("Couldn't toggle habit status.");
		this.name = "ToggleHabitStatusError";
		this.habitId = habitId;
		this.date = date;
	}
}

interface ToggleHabitCompletionErrorParams {
	habitId: string;
	date: DateType;
}

export class ToggleHabitCompletionError extends HabitError {
	habitId: string;
	date: DateType;

	constructor({ habitId, date }: ToggleHabitCompletionErrorParams) {
		super("Couldn't toggle habit completion.");
		this.name = "ToggleHabitCompletionError";
		this.habitId = habitId;
		this.date = date;
	}
}

interface HabitNotFoundErrorParams {
	habitId: string;
}

export class HabitNotFoundError extends HabitError {
	habitId: string;

	constructor({ habitId }: HabitNotFoundErrorParams) {
		super("Habit not found.");
		this.name = "HabitNotFoundError";
		this.habitId = habitId;
	}
}
