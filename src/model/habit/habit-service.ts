import {
	addDays,
	isBefore,
	isSameDay,
	parseISO,
	type HabitDate,
} from "@/lib/date";
import {
	HabitNotFoundError,
	ToggleHabitCompletionError,
	ToggleHabitStatusError,
} from "@/model/habit/errors";
import { Habit, type WeekRepeat } from "@/model/habit/habit";
import type { HabitInputModel } from "@/model/habit/habit-input-model";
import type { HabitRepository } from "@/model/habit/habit-repository";
import { habitToViewModel } from "@/model/habit/habit-view-model";
import { differenceInDays, differenceInWeeks } from "date-fns";

function getWeekday(date: Date): string {
	return date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
}

/**
 * This function will get messy if we need to add more rules.
 * TODO: Consider refactoring when touching this code.
 */
function isHabitDueOn(habit: Habit, target: HabitDate) {
	const repeat = habit.schedule.repeat;
	const start = parseISO(habit.schedule.startDate);

	if (isBefore(target, start)) return false;

	if (!repeat) return isSameDay(target, start);

	const duration = repeat.duration;

	if (duration.type === "untilDate") {
		const end = parseISO(duration.endDate);
		if (isBefore(end, target)) return false;
	}

	const isMatch = (date: Date) => {
		if (repeat.type === "day") {
			// TODO: encapsulate these date-fns functions into date.ts lib
			const days = differenceInDays(date, start);
			return days % repeat.everyNumberOfDays === 0;
		} else {
			const weeks = differenceInWeeks(date, start);
			const weekday = getWeekday(date);
			return (
				weeks % repeat.everyNumberOfWeeks === 0 &&
				repeat.daysOfWeek.includes(weekday as WeekRepeat["daysOfWeek"][number])
			);
		}
	};

	if (duration.type === "afterOccurrences") {
		let count = 0;
		let current = start;
		const max = duration.count;

		while (!isBefore(target, current)) {
			if (isMatch(current)) {
				count++;
				if (isSameDay(current, target)) return true;
				if (count >= max) return false;
			}

			current = addDays(current, 1);
		}

		return false;
	}

	return isMatch(target);
}

export class HabitService {
	constructor(private repository: HabitRepository) {}

	getHabit(id: string) {
		const habit = this.repository.get(id);
		if (!habit) {
			throw new HabitNotFoundError({ habitId: id });
		}
		return habit;
	}

	getHabits(date: HabitDate) {
		return this.repository
			.getAll()
			.map((habit) => habitToViewModel(habit, date));
	}

	getHabitsDueOnDate(date: HabitDate) {
		return this.repository
			.getAll()
			.filter((habit) => isHabitDueOn(habit, date))
			.map((habit) => habitToViewModel(habit, date));
	}

	addHabit(item: HabitInputModel) {
		this.repository.add(new Habit(item.name, item.schedule));
	}

	editHabit(id: string, habit: HabitInputModel) {
		const currentHabit = this.repository.get(id);
		if (!currentHabit) return;
		this.repository.update(Object.assign(currentHabit, habit));
	}

	deleteHabit(id: string) {
		this.repository.delete(id);
	}

	toggleStatus(id: string, date: HabitDate) {
		const habit = this.getHabit(id);

		if (!habit.canToggleStatus(date)) {
			throw new ToggleHabitStatusError({
				habitId: id,
				date,
			});
		}

		habit.toggleStatus(date);

		this.repository.update(habit);
	}

	toggleCompletion(id: string, date: HabitDate) {
		const habit = this.getHabit(id);

		if (!habit.canToggleCompletion(date)) {
			throw new ToggleHabitCompletionError({
				habitId: id,
				date,
			});
		}

		habit.toggleCompletion(date);

		this.repository.update(habit);
	}

	canToggleCompletion(id: string, date: HabitDate) {
		const habit = this.repository.get(id);
		return habit?.canToggleCompletion(date);
	}

	canToggleStatus(id: string, date: HabitDate) {
		const habit = this.repository.get(id);
		return habit?.canToggleStatus(date);
	}
}
