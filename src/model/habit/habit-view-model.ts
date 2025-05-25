import type { Repeat } from "@/model/habit/habit";
import type { HabitStatus } from "@/model/habit/habit-status-change";

export interface HabitRecordViewModel {
	habitId: string;
	date: string;
	completed: boolean;
}

export interface HabitStatusChangeViewModel {
	habitId: string;
	date: string;
	status: "active" | "paused";
}

export interface HabitViewModel {
	id: string;
	name: string;
	startDate: string;
	canToggleCompletion: boolean;
	canToggleStatus: boolean;
	completed: boolean;
	wasCompleted: boolean;
	activeStatus: HabitStatus;
	repeat?: Repeat;
}
