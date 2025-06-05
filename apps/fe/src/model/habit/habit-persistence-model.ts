import type { HabitSchedule } from "@/model/habit/habit";

export interface HabitRecordPersistenceModel {
	habitId: string;
	date: string;
	completed: boolean;
}

export interface HabitStatusChangePersistenceModel {
	habitId: string;
	date: string;
	status: "active" | "paused";
}

export interface HabitPersistenceModel {
	id: string;
	name: string;
	schedule: HabitSchedule;
	createdAt: string;
	records: HabitRecordPersistenceModel[];
	statusChanges: HabitStatusChangePersistenceModel[];
}
