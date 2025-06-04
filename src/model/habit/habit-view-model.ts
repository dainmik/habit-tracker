import type { HabitDate } from "@/lib/date";
import type { Habit, Repeat } from "@/model/habit/habit";
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

export const habitToViewModel = (
	habit: Habit,
	targetDate: HabitDate,
): HabitViewModel => {
	return {
		id: habit.id,
		name: habit.name,
		canToggleCompletion: habit.canToggleCompletion(targetDate),
		canToggleStatus: habit.canToggleStatus(targetDate),
		completed: habit.getCompleted(targetDate),
		wasCompleted: habit.wasHabitCompleted(targetDate),
		activeStatus: habit.getStatusOn(targetDate),
		startDate: habit.schedule.startDate,
		repeat: habit.schedule.repeat,
	};
};
