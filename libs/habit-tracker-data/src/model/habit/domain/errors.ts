import { HabitTrackerError } from "#model/common/error";
import type { DateType } from "@repo/date";

interface HabitWithoutNameErrorParams {
	habitId: string;
}

export class HabitWithoutNameError extends HabitTrackerError {
	habitId: string;

	constructor({ habitId }: HabitWithoutNameErrorParams) {
		super("Habit must have a name.");
		this.name = "HabitWithoutNameError";
		this.habitId = habitId;
	}
}

interface HabitWithNameAlreadyExistsErrorParams {
	habitName: string;
}

export class HabitWithNameAlreadyExistsError extends HabitTrackerError {
	habitName: string;

	constructor({ habitName }: HabitWithNameAlreadyExistsErrorParams) {
		super(`Habit with name '${habitName}' already exists.`);
		this.name = "HabitWithNameAlreadyExistsError";
		this.habitName = habitName;
	}
}

interface ToggleHabitStatusErrorParams {
	habitId: string;
	date: DateType;
}

export class ToggleHabitStatusError extends HabitTrackerError {
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

export class ToggleHabitCompletionError extends HabitTrackerError {
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

export class HabitNotFoundError extends HabitTrackerError {
	habitId: string;

	constructor({ habitId }: HabitNotFoundErrorParams) {
		super("Habit not found.");
		this.name = "HabitNotFoundError";
		this.habitId = habitId;
	}
}
