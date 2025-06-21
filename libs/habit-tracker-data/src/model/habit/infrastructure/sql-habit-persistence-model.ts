import {
	habitRecords,
	habits,
	habitScheduleDayRepeats,
	habitScheduleDurations,
	habitSchedules,
	habitScheduleWeekRepeats,
	habitStatusChanges,
} from "#model/schema";
import { type InferInsertModel } from "drizzle-orm";

export type HabitRecordPersistenceModel = InferInsertModel<typeof habitRecords>;

export type HabitStatusChangePersistenceModel = InferInsertModel<
	typeof habitStatusChanges
>;

export type HabitScheduleDurationPersistenceModel = InferInsertModel<
	typeof habitScheduleDurations
>;

export type HabitScheduleDayRepeatPersistenceModel = InferInsertModel<
	typeof habitScheduleDayRepeats
>;

export type HabitScheduleWeekRepeatPersistenceModel = InferInsertModel<
	typeof habitScheduleWeekRepeats
>;

export type HabitSchedulePersistenceModel = InferInsertModel<
	typeof habitSchedules
>;

export type HabitPersistenceModel = InferInsertModel<typeof habits>;

export interface HabitAggregatePersistenceModel {
	habit: HabitPersistenceModel;
	schedule: HabitSchedulePersistenceModel;
	dayRepeat: HabitScheduleDayRepeatPersistenceModel | null;
	weekRepeat: HabitScheduleWeekRepeatPersistenceModel | null;
	duration: HabitScheduleDurationPersistenceModel | null;
	records: HabitRecordPersistenceModel[];
	statusChanges: HabitStatusChangePersistenceModel[];
}
