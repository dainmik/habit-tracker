import { generateID } from "#model/common/domain/entity";
import type { Mapper } from "#model/common/mapper";
import { Habit } from "#model/habit/domain/habit";
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

import type {
	HabitInputModel,
	HabitScheduleDayRepeatInputModel,
	HabitScheduleDurationInputModel,
	HabitScheduleInputModel,
	HabitScheduleRepeatInputModel,
	HabitScheduleWeekRepeatInputModel,
} from "#model/models";
import { convertDateToIso, parseISO } from "@repo/date";

export const HabitScheduleDurationMapper: Mapper<
	HabitScheduleDuration,
	HabitScheduleDurationInputModel
> = {
	to(item) {
		if (item instanceof HabitScheduleDurationUntilDate) {
			return {
				type: "untilDate",
				endDate: convertDateToIso(item.endDate),
			};
		}
		if (item instanceof HabitScheduleDurationAfterOccurrences) {
			return {
				type: "afterOccurrences",
				afterOccurrences: item.afterOccurrences,
			};
		}

		if (item instanceof HabitScheduleDurationForever) {
			return {
				type: "forever",
			};
		}

		throw new Error("Unsupported Duration type.");
	},

	from(dto) {
		let duration: HabitScheduleDuration;
		if (dto.type === "afterOccurrences") {
			duration = new HabitScheduleDurationAfterOccurrences({
				afterOccurrences: dto.afterOccurrences,
			});
		} else if (dto.type === "untilDate") {
			duration = new HabitScheduleDurationUntilDate({
				endDate: parseISO(dto.endDate),
			});
		} else {
			duration = new HabitScheduleDurationForever();
		}

		return duration;
	},
};

export const HabitScheduleRepeatMapper: Mapper<
	Repeat | null,
	HabitScheduleRepeatInputModel | null,
	undefined,
	{ scheduleId: string }
> = {
	to(item) {
		if (item instanceof HabitScheduleDayRepeat) {
			return {
				type: "day",
				duration: HabitScheduleDurationMapper.to(item.duration),
				everyNumberOfDays: item.everyNumberOfDays,
			} as HabitScheduleDayRepeatInputModel;
		}
		if (item instanceof HabitScheduleWeekRepeat) {
			return {
				type: "week",
				duration: HabitScheduleDurationMapper.to(item.duration),
				everyNumberOfWeeks: item.everyNumberOfWeeks,
				daysOfWeek: item.daysOfWeek,
			} as HabitScheduleWeekRepeatInputModel;
		}

		return null;
	},

	from(dto, { scheduleId }) {
		if (!dto) return null;

		const duration = HabitScheduleDurationMapper.from(dto.duration);

		let repeat: Repeat | null = null;
		if (dto.type === "day") {
			repeat = new HabitScheduleDayRepeat({
				scheduleId,
				duration,
				everyNumberOfDays: dto.everyNumberOfDays,
			});
		}
		if (dto.type === "week") {
			new HabitScheduleWeekRepeat({
				scheduleId,
				duration,
				everyNumberOfWeeks: dto.everyNumberOfWeeks,
				daysOfWeek: dto.daysOfWeek,
			});
		}

		return repeat;
	},
};

export const HabitScheduleMapper: Mapper<
	HabitSchedule,
	HabitScheduleInputModel,
	undefined,
	{ habitId: string }
> = {
	to(item) {
		return {
			startDate: convertDateToIso(item.startDate),
			repeat: HabitScheduleRepeatMapper.to(item.repeat),
		};
	},

	from(dto, { habitId }) {
		const scheduleId = generateID();

		return new HabitSchedule({
			id: scheduleId,
			habitId,
			startDate: parseISO(dto.startDate),
			repeat: HabitScheduleRepeatMapper.from(dto.repeat ?? null, {
				scheduleId,
			}),
		});
	},
};

export const HabitMapper: Mapper<
	Habit,
	HabitInputModel,
	undefined,
	{ id?: string }
> = {
	to(item) {
		return {
			id: item.id,
			name: item.name,
			schedule: HabitScheduleMapper.to(item.schedule),
		};
	},

	from(dto, { id }) {
		const habitId = id ?? generateID();

		return Habit.create({
			id: habitId,
			name: dto.name,
			schedule: HabitScheduleMapper.from(dto.schedule, { habitId }),
		});
	},
};
