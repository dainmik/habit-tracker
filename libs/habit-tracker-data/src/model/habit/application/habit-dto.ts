import type { HabitInputModel } from "#model/habit/application/habit-input-model";
import type { Habit } from "#model/habit/domain/habit";
import type { DateType } from "@repo/date";
import { HabitMapper } from "./mapper.ts";

export interface HabitDTO extends HabitInputModel {
	id: string;
	canToggleCompletion: boolean;
	canToggleStatus: boolean;
	completed: boolean;
	wasCompleted: boolean;
	activeStatus: "active" | "paused";
}

export const mapFromHabitToDTO = (
	habit: Habit,
	targetDate: DateType,
): HabitDTO => {
	return {
		id: habit.id,
		...HabitMapper.to(habit),

		canToggleCompletion: habit.canToggleCompletion(targetDate),
		canToggleStatus: habit.canToggleStatus(targetDate),
		completed: habit.getCompleted(targetDate),
		wasCompleted: habit.wasHabitCompleted(targetDate),
		activeStatus: habit.getStatusOn(targetDate),
	};
};
