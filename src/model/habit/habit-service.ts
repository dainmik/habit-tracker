import {
	addDays,
	isBefore,
	isSameDay,
	parseISO,
	type HabitDate,
} from "@/lib/date";
import { Habit, type WeekRepeat } from "@/model/habit/habit";
import type { HabitInputModel } from "@/model/habit/habit-input-model";
import { HabitMapper } from "@/model/habit/habit-mapper";
import type { HabitRepository } from "@/model/habit/habit-repository";
import { differenceInDays, differenceInWeeks } from "date-fns";

function getWeekday(date: Date): string {
	return date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
}

function isHabitDueOn(habit: Habit, target: HabitDate): boolean {
	const repeat = habit.schedule.repeat;
	const start = parseISO(habit.schedule.startDate);

	if (isBefore(target, start)) return false;

	if (!repeat) return isSameDay(target, start);

	const duration = repeat.duration;

	// Check end date duration
	if (duration.type === "untilDate") {
		const end = parseISO(duration.endDate);
		if (isBefore(end, target)) return false;
	}

	// Helper to check if a day matches the schedule
	const isMatch = (date: Date): boolean => {
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

			// Step by day for week/day mode
			current = addDays(current, 1);
		}

		return false;
	}

	return isMatch(target);
}

export class HabitService {
	constructor(private repository: HabitRepository) {}

	getHabits(date: HabitDate) {
		return this.repository
			.getAll()
			.map((habit) => HabitMapper.toViewModel(habit, date));
	}

	getHabitsDueOnDate(date: HabitDate) {
		return this.repository
			.getAll()
			.filter((habit) => isHabitDueOn(habit, date))
			.map((habit) => HabitMapper.toViewModel(habit, date));
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
		const habit = this.repository.get(id);
		if (!habit) return;

		if (!habit.canToggleStatus(date)) return;

		habit.toggleStatus(date);

		this.repository.update(habit);
	}

	toggleCompletion(id: string, date: HabitDate) {
		const habit = this.repository.get(id);
		if (!habit) return;

		if (!habit.canToggleCompletion(date)) return;

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
