import { HABIT_SCHEDULE_DURATION } from "#model/habit/domain/habit-schedule-repeat-duration";
import { HABIT_STATUS } from "#model/habit/domain/habit-status-change";
import type { Weekday } from "@repo/date";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const id = text().primaryKey().notNull();

export const habits = sqliteTable("habits", {
	id,
	name: text().unique().notNull(),
	createdAt: text().notNull(),
});

export const habitSchedules = sqliteTable("habit_schedules", {
	id,
	habitId: text()
		.notNull()
		.references(() => habits.id, { onDelete: "cascade" }),
	startDate: text().notNull(),
});

export const habitScheduleDurations = sqliteTable("habit_schedule_durations", {
	scheduleId: text()
		.primaryKey()
		.notNull()
		.references(() => habitSchedules.id, { onDelete: "cascade" }),
	// durationType could be inferred based on the values of endDate and occurrenceCount. If occurrenceCount is 0 or null, means it is until date, if the endDate is null, it means until occurrence count. If both are null, the habit repeats forever.
	durationType: text({
		enum: HABIT_SCHEDULE_DURATION,
	}).notNull(),
	endDate: text(),
	occurrenceCount: integer(),
});

export const habitScheduleDayRepeats = sqliteTable(
	"habit_schedule_day_repeats",
	{
		id,
		scheduleId: text()
			.notNull()
			.references(() => habitSchedules.id, { onDelete: "cascade" }),
		everyNumberOfDays: integer().notNull(),
	},
);

export const habitScheduleWeekRepeats = sqliteTable(
	"habit_schedule_week_repeats",
	{
		id,
		scheduleId: text()
			.notNull()
			.references(() => habitSchedules.id, { onDelete: "cascade" }),
		everyNumberOfWeeks: integer().notNull(),
		daysOfWeek: text({ mode: "json" }).$type<Weekday[]>().notNull(),
	},
);

export const habitRecords = sqliteTable("habit_records", {
	id,
	habitId: text()
		.notNull()
		.references(() => habits.id, { onDelete: "cascade" }),
	date: text().notNull(),
	completed: integer({ mode: "boolean" }).notNull(),
	createdAt: text().notNull(),
});

export const habitStatusChanges = sqliteTable("habit_status_changes", {
	id,
	habitId: text()
		.notNull()
		.references(() => habits.id, { onDelete: "cascade" }),
	date: text().notNull(),
	status: text({ enum: HABIT_STATUS }).notNull(),
});
