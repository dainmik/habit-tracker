import { generateID } from "#model/common/domain/entity";
import type { Mapper } from "#model/common/mapper";
import { Habit } from "#model/habit/domain/habit";
import { HabitRecord } from "#model/habit/domain/habit-record";
import { HabitSchedule } from "#model/habit/domain/habit-schedule";
import {
	HabitScheduleDayRepeat,
	HabitScheduleWeekRepeat,
	type Repeat,
} from "#model/habit/domain/habit-schedule-repeat";
import {
	HabitScheduleDurationAfterOccurrences,
	HabitScheduleDurationForever,
	HabitScheduleDurationUntilDate,
	type HabitScheduleDuration,
} from "#model/habit/domain/habit-schedule-repeat-duration";
import { HabitStatusChange } from "#model/habit/domain/habit-status-change";
import type {
	HabitAggregatePersistenceModel,
	HabitRecordPersistenceModel,
	HabitScheduleDurationPersistenceModel,
	HabitStatusChangePersistenceModel,
} from "#model/habit/infrastructure/sql-habit-persistence-model";
import { convertDateToIso, parseISO } from "@repo/date";

export const HabitScheduleDurationSqlMapper: Mapper<
	HabitScheduleDuration,
	HabitScheduleDurationPersistenceModel,
	{ scheduleId: string }
> = {
	to(item, { scheduleId }) {
		if (item instanceof HabitScheduleDurationUntilDate) {
			return {
				scheduleId,
				durationType: "untilDate",
				endDate: convertDateToIso(item.endDate),
				occurrenceCount: null,
			};
		}
		if (item instanceof HabitScheduleDurationAfterOccurrences) {
			return {
				scheduleId,
				durationType: "afterOccurrences",
				endDate: null,
				occurrenceCount: item.afterOccurrences,
			};
		}

		return {
			scheduleId,
			durationType: "forever",
			endDate: null,
			occurrenceCount: null,
		};
	},

	from(dto) {
		if (dto.durationType === "untilDate") {
			return new HabitScheduleDurationUntilDate({
				endDate: parseISO(dto.endDate ?? "1900-01-01"),
			});
		}
		if (dto.durationType === "afterOccurrences") {
			return new HabitScheduleDurationAfterOccurrences({
				afterOccurrences: dto.occurrenceCount ?? 0,
			});
		}

		return new HabitScheduleDurationForever();
	},
};

export const HabitRecordSqlMapper: Mapper<
	HabitRecord,
	HabitRecordPersistenceModel
> = {
	to(record) {
		return {
			id: record.id,
			habitId: record.habitId,
			date: convertDateToIso(record.date),
			completed: record.completed,
			createdAt: convertDateToIso(record.createdAt),
		};
	},

	from(dto) {
		return new HabitRecord(dto.habitId, parseISO(dto.date), dto.completed);
	},
};

export const HabitStatusChangeSqlMapper: Mapper<
	HabitStatusChange,
	HabitStatusChangePersistenceModel
> = {
	to(change) {
		return {
			id: change.id,
			habitId: change.habitId,
			status: change.status,
			date: convertDateToIso(change.date),
		};
	},

	from(dto) {
		return new HabitStatusChange(dto.habitId, parseISO(dto.date), dto.status);
	},
};

export const HabitAggregateSqlMapper: Mapper<
	Habit,
	HabitAggregatePersistenceModel
> = {
	to(habit) {
		const habitDTO = {
			id: habit.id,
			name: habit.name,
			createdAt: convertDateToIso(habit.createdAt),
		};

		const scheduleDTO = {
			id: habit.schedule.id,
			habitId: habit.id,
			startDate: convertDateToIso(habit.schedule.startDate),
		};

		const repeat = habit.schedule.repeat;
		const dayRepeatDTO =
			repeat instanceof HabitScheduleDayRepeat
				? {
						id: generateID(),
						scheduleId: habit.schedule.id,
						everyNumberOfDays: repeat.everyNumberOfDays,
					}
				: null;

		const weekRepeatDTO =
			repeat instanceof HabitScheduleWeekRepeat
				? {
						id: generateID(),
						scheduleId: habit.schedule.id,
						everyNumberOfWeeks: repeat.everyNumberOfWeeks,
						daysOfWeek: repeat.daysOfWeek,
					}
				: null;

		const durationDTO = repeat
			? HabitScheduleDurationSqlMapper.to(repeat.duration, {
					scheduleId: scheduleDTO.id,
				})
			: null;

		const recordDTOs = habit._records.map((record) =>
			HabitRecordSqlMapper.to(record),
		);
		const statusChangeDTOs = habit._statusChanges.map((statusChange) =>
			HabitStatusChangeSqlMapper.to(statusChange),
		);

		return {
			habit: habitDTO,
			schedule: scheduleDTO,
			dayRepeat: dayRepeatDTO,
			weekRepeat: weekRepeatDTO,
			duration: durationDTO,
			records: recordDTOs,
			statusChanges: statusChangeDTOs,
		};
	},

	from(dto) {
		const {
			habit,
			schedule,
			dayRepeat,
			weekRepeat,
			duration,
			records,
			statusChanges,
		} = dto;

		let repeat: Repeat | null = null;
		if (duration) {
			if (dayRepeat) {
				repeat = new HabitScheduleDayRepeat({
					scheduleId: schedule.id,
					duration: HabitScheduleDurationSqlMapper.from(duration),
					everyNumberOfDays: dayRepeat.everyNumberOfDays,
				});
			}
			if (weekRepeat) {
				repeat = new HabitScheduleWeekRepeat({
					scheduleId: schedule.id,
					duration: HabitScheduleDurationSqlMapper.from(duration),
					everyNumberOfWeeks: weekRepeat.everyNumberOfWeeks,
					daysOfWeek: weekRepeat.daysOfWeek,
				});
			}
		}

		const habitSchedule = new HabitSchedule({
			habitId: schedule.habitId,
			startDate: parseISO(schedule.startDate),
			repeat,
		});
		habitSchedule.id = schedule.id;

		const entity = new Habit({
			id: habit.id,
			name: habit.name,
			schedule: habitSchedule,
		});
		entity.createdAt = parseISO(habit.createdAt);
		entity._records = records.map((record) =>
			HabitRecordSqlMapper.from(record),
		);
		entity._statusChanges = statusChanges.map((statusChange) =>
			HabitStatusChangeSqlMapper.from(statusChange),
		);

		return entity;
	},
};
