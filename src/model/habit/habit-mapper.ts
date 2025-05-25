import type { HabitDate } from "@/lib/date";
import type { Habit } from "@/model/habit/habit";
import type { HabitViewModel } from "@/model/habit/habit-view-model";

export const HabitMapper = {
	toViewModel(habit: Habit, targetDate: HabitDate): HabitViewModel {
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
	},
};
