import type { HabitSchedule } from "@/model/habit/habit";

export interface HabitRecordInputModel {
	habitId: string;
	date: string;
	completed: boolean;
}

export interface HabitStatusChangeInputModel {
	habitId: string;
	date: string;
	status: "active" | "paused";
}

export interface HabitInputModel {
	name: string;
	schedule: HabitSchedule;
}
