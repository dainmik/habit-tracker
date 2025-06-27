import { Habit } from "#model/habit/domain/habit";
import { HabitStatusChange } from "#model/habit/domain/habit-status-change";
import { addDays, parseISO, startOfToday } from "@repo/date";
import { beforeEach, describe, expect, it } from "vitest";
import { HabitBuilder } from "./habit-builder.ts";

const today = startOfToday();
const tomorrow = addDays(today, 1);
const yesterday = addDays(today, -1);

let habit: Habit;

beforeEach(() => {
	habit = new HabitBuilder()
		.withId("1")
		.withName("Test Habit")
		.withStartDate(today)
		.withDailyRepeat(1)
		.build();
});

describe("create", () => {
	it("should create habit with proper properties", () => {
		expect(habit.id).toBe("1");
		expect(habit.name).toBe("Test Habit");
		expect(habit.schedule.startDate).toEqual(today);
		expect(habit._records).toHaveLength(0);
		expect(habit._statusChanges).toHaveLength(0);
	});
});

describe("canToggleCompletion", () => {
	it.each([
		["today", today, true],
		["yesterday", yesterday, true],
		["tomorrow", tomorrow, false],
	])(
		"should return $2 when date is $0 relative to starting date",
		(_, date, expected) => {
			expect(habit.canToggleCompletion(date)).toBe(expected);
		},
	);

	it("returns false if latest status before date is paused", () => {
		habit._statusChanges.push(
			new HabitStatusChange(habit.id, yesterday, "paused"),
		);
		expect(habit.canToggleCompletion(today)).toBe(false);
	});
	it("returns false if latest status on date is paused", () => {
		habit._statusChanges.push(new HabitStatusChange(habit.id, today, "paused"));
		expect(habit.canToggleCompletion(today)).toBe(false);
	});

	it("returns true if latest status is active", () => {
		habit._statusChanges.push(
			new HabitStatusChange(habit.id, yesterday, "active"),
		);
		expect(habit.canToggleCompletion(today)).toBe(true);
	});
});

describe("toggleCompletion", () => {
	it("throws if cannot toggle completion", () => {
		const futureDate = addDays(today, 2);
		expect(() => {
			habit.toggleCompletion(futureDate);
		}).toThrow();
	});

	it("toggles completion on existing record", () => {
		habit.toggleCompletion(today);
		expect(habit.getCompleted(today)).toBe(true);

		habit.toggleCompletion(today);
		expect(habit.getCompleted(today)).toBe(false);
	});

	it("creates a new completion record if none exists", () => {
		habit.toggleCompletion(today);
		const record = habit.getRecord(today);
		expect(record).toBeDefined();
		expect(record?.completed).toBe(true);
	});
});

describe("wasHabitCompleted", () => {
	it.each([
		["today", today],
		["tomorrow", tomorrow],
	])("returns true if record does not exist for $0", (_, date) => {
		expect(habit.wasHabitCompleted(date)).toBe(true);
	});

	it("returns false if record does not exist for past date", () => {
		expect(habit.wasHabitCompleted(yesterday)).toBe(false);
	});

	it("returns true if record exists and completed", () => {
		habit.toggleCompletion(yesterday);
		expect(habit.wasHabitCompleted(yesterday)).toBe(true);
	});
});

describe("getStatusOn", () => {
	it("returns 'active' if no status changes", () => {
		expect(habit.getStatusOn(today)).toBe("active");
	});

	it("returns latest status change on or before date", () => {
		habit._statusChanges.push(
			new HabitStatusChange(habit.id, addDays(today, -3), "paused"),
			new HabitStatusChange(habit.id, yesterday, "active"),
		);
		expect(habit.getStatusOn(today)).toBe("active");
		expect(habit.getStatusOn(addDays(today, -2))).toBe("paused");
	});
});

describe("canToggleStatus", () => {
	it.each([
		["today", today, true],
		["tomorrow", tomorrow, true],
		["yesterday", yesterday, false],
	])("allows toggling status for $0", (_, date, expected) => {
		expect(habit.canToggleStatus(date)).toBe(expected);
	});
});

describe("toggleStatus", () => {
	it("throws if cannot toggle status", () => {
		const pastDate = yesterday;
		expect(() => {
			habit.toggleStatus(pastDate);
		}).toThrow();
	});

	it("toggles status from active to paused", () => {
		habit.toggleStatus(today);
		expect(habit.getStatusOn(today)).toBe("paused");
	});

	it("toggles status from paused to active", () => {
		habit.toggleStatus(today);
		habit.toggleStatus(today);
		expect(habit.getStatusOn(today)).toBe("active");
	});

	it("updates existing status change instead of adding new", () => {
		habit.toggleStatus(today);
		const countBefore = habit._statusChanges.length;
		habit.toggleStatus(today);
		expect(habit._statusChanges.length).toBe(countBefore);
	});
});

describe("isHabitDueOn", () => {
	it("returns false for dates before start date", () => {
		const beforeStart = addDays(habit.schedule.startDate, -1);
		expect(habit.isHabitDueOn(beforeStart)).toBe(false);
	});

	it("returns true for start date when no repeat", () => {
		const noRepeatHabit = new HabitBuilder()
			.withName("No Repeat")
			.withStartDate(today)
			.build();
		expect(noRepeatHabit.isHabitDueOn(today)).toBe(true);
		expect(noRepeatHabit.isHabitDueOn(tomorrow)).toBe(false);
	});

	it("handles daily repeat correctly", () => {
		const habitRepeatForever = new HabitBuilder()
			.withName("Repeat")
			.withStartDate(today)
			.withDailyRepeat(1)
			.build();

		expect(habitRepeatForever.isHabitDueOn(today)).toBe(true);
		expect(habitRepeatForever.isHabitDueOn(tomorrow)).toBe(true);
		expect(habitRepeatForever.isHabitDueOn(addDays(today, 2))).toBe(true);
	});

	it("handles weekly repeat with weekdays correctly", () => {
		const monday = parseISO("2025-06-23");
		const tuesday = addDays(monday, 1);
		const wednesday = addDays(monday, 2);
		const thursday = addDays(monday, 3);
		const friday = addDays(monday, 4);
		const saturday = addDays(monday, 5);
		const sunday = addDays(monday, 6);

		const weeklyHabit = new HabitBuilder()
			.withName("Weekly Habit")
			.withStartDate(monday)
			.withWeeklyRepeat(1, ["monday", "wednesday"])
			.build();

		expect(weeklyHabit.isHabitDueOn(monday)).toBe(true);
		expect(weeklyHabit.isHabitDueOn(tuesday)).toBe(false);
		expect(weeklyHabit.isHabitDueOn(wednesday)).toBe(true);
		expect(weeklyHabit.isHabitDueOn(thursday)).toBe(false);
		expect(weeklyHabit.isHabitDueOn(friday)).toBe(false);
		expect(weeklyHabit.isHabitDueOn(saturday)).toBe(false);
		expect(weeklyHabit.isHabitDueOn(sunday)).toBe(false);
	});

	it("respects duration until date", () => {
		const endDate = addDays(today, 2);
		const habitWithEnd = new HabitBuilder()
			.withName("End Habit")
			.withStartDate(today)
			.withDailyRepeat(1)
			.withDurationUntil(endDate)
			.build();

		expect(habitWithEnd.isHabitDueOn(tomorrow)).toBe(true);
		expect(habitWithEnd.isHabitDueOn(addDays(today, 3))).toBe(false);
	});

	it("respects duration after occurrences", () => {
		const habitWithOccurrences = new HabitBuilder()
			.withName("Test Habit")
			.withStartDate(today)
			.withDailyRepeat(1)
			.withDurationAfter(3)
			.build();

		expect(habitWithOccurrences.isHabitDueOn(today)).toBe(true);
		expect(habitWithOccurrences.isHabitDueOn(tomorrow)).toBe(true);
		expect(habitWithOccurrences.isHabitDueOn(addDays(today, 2))).toBe(true);
		expect(habitWithOccurrences.isHabitDueOn(addDays(today, 3))).toBe(false);
	});
});
