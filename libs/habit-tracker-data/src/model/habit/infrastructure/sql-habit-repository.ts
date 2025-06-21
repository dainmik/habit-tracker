import type { DbClient } from "#db/client";
import { Habit } from "#model/habit/domain/habit";
import type { HabitRepository } from "#model/habit/domain/habit-repository";
import {
	habitRecords,
	habits,
	habitScheduleDayRepeats,
	habitScheduleDurations,
	habitSchedules,
	habitScheduleWeekRepeats,
	habitStatusChanges,
} from "#model/habit/infrastructure/schema";
import type {
	HabitRecordPersistenceModel,
	HabitStatusChangePersistenceModel,
} from "#model/habit/infrastructure/sql-habit-persistence-model";
import { eq } from "drizzle-orm";
import { HabitAggregateSqlMapper } from "./sql-mapper.ts";

export class SQLHabitRepository implements HabitRepository {
	private readonly db: DbClient;

	constructor(db: DbClient) {
		this.db = db;
	}

	async get(id: string) {
		const rows = await this.db
			.select({
				habit: habits,
				schedule: habitSchedules,
				dayRepeat: habitScheduleDayRepeats,
				weekRepeat: habitScheduleWeekRepeats,
				duration: habitScheduleDurations,
				record: habitRecords,
				statusChange: habitStatusChanges,
			})
			.from(habits)
			.leftJoin(habitSchedules, eq(habits.id, habitSchedules.habitId))
			.leftJoin(
				habitScheduleDayRepeats,
				eq(habitSchedules.id, habitScheduleDayRepeats.scheduleId),
			)
			.leftJoin(
				habitScheduleWeekRepeats,
				eq(habitSchedules.id, habitScheduleWeekRepeats.scheduleId),
			)
			.leftJoin(
				habitScheduleDurations,
				eq(habitSchedules.id, habitScheduleDurations.scheduleId),
			)
			.leftJoin(habitRecords, eq(habits.id, habitRecords.habitId))
			.leftJoin(habitStatusChanges, eq(habits.id, habitStatusChanges.habitId))
			.where(eq(habits.id, id));

		const firstRow = rows[0];
		if (!firstRow) return;

		const { habit, schedule, dayRepeat, weekRepeat, duration } = firstRow;

		if (!schedule) return;

		const records: HabitRecordPersistenceModel[] = [];
		for (const row of rows) {
			if (row.record) {
				records.push({
					id: row.record.id,
					habitId: row.record.habitId,
					date: row.record.date,
					completed: row.record.completed,
					createdAt: row.record.createdAt,
				});
			}
		}

		const statusChanges: HabitStatusChangePersistenceModel[] = [];
		for (const row of rows) {
			if (row.statusChange) {
				statusChanges.push({
					id: row.statusChange.id,
					habitId: row.statusChange.habitId,
					date: row.statusChange.date,
					status: row.statusChange.status,
				});
			}
		}

		return HabitAggregateSqlMapper.from({
			habit,
			schedule,
			dayRepeat,
			weekRepeat,
			duration,
			records,
			statusChanges,
		});
	}

	async getAll() {
		const habitIds = await this.db.select({ id: habits.id }).from(habits);
		const results = await Promise.all(habitIds.map(({ id }) => this.get(id)));
		return results.filter((habit): habit is Habit => !!habit);
	}

	async add(habit: Habit) {
		const dto = HabitAggregateSqlMapper.to(habit);

		await this.db.transaction(async (tx) => {
			await tx.insert(habits).values(dto.habit);
			await tx.insert(habitSchedules).values(dto.schedule);

			if (dto.dayRepeat) {
				await tx.insert(habitScheduleDayRepeats).values(dto.dayRepeat);
			}
			if (dto.weekRepeat) {
				await tx.insert(habitScheduleWeekRepeats).values(dto.weekRepeat);
			}
			if (dto.duration) {
				await tx.insert(habitScheduleDurations).values(dto.duration);
			}

			for (const record of dto.records) {
				await tx.insert(habitRecords).values(record);
			}
			for (const statusChange of dto.statusChanges) {
				await tx.insert(habitStatusChanges).values(statusChange);
			}
		});
	}

	async update(habit: Habit) {
		/**
		 * Updating a Habit involves conditional nested data (e.g. records, repeats, status)
		 * that makes SQL UPDATEs complex and error-prone.
		 *
		 * Instead, we treat the update as a full replacement: DELETE the existing habit
		 * and INSERT the new one. This simplifies the persistence logic and ensures data consistency.
		 *
		 * ⚠️ Important constraints:
		 * - The Habit ID must be preserved to maintain referential integrity.
		 * - There must be no onDelete CASCADE side effects outside this aggregate.
		 * - The database must not generate any habit data (e.g. auto IDs or timestamps).
		 *
		 * ✅ In our case:
		 * - We fully control ID and timestamp generation in code.
		 * - The Habit aggregate is self-contained.
		 * - No external references exist, so this approach is safe and clean.
		 */

		// TODO: this should happen inside a transaction
		await this.delete(habit.id);
		await this.add(habit);
	}

	async delete(id: string) {
		await this.db.delete(habits).where(eq(habits.id, id));
	}
}
