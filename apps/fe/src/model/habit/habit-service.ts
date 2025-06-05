import {
	addDays,
	addWeeks,
	isAfter,
	isBefore,
	isSameDay,
	parseISO,
	type DateType,
} from "@/lib/date";
import {
	HabitNotFoundError,
	ToggleHabitCompletionError,
	ToggleHabitStatusError,
} from "@/model/habit/errors";
import { Habit, WEEKDAYS, type WeekRepeat } from "@/model/habit/habit";
import type { HabitInputModel } from "@/model/habit/habit-input-model";
import type { HabitRepository } from "@/model/habit/habit-repository";
import { habitToViewModel } from "@/model/habit/habit-view-model";
import { differenceInDays } from "date-fns";

function getWeekday(date: Date) {
	return date
		.toLocaleDateString("en-US", { weekday: "long" })
		.toLowerCase() as WeekRepeat["daysOfWeek"][number];
}

/**
 * This function will get messy if we need to add more rules.
 * TODO: Consider refactoring when touching this code.
 */
function isHabitDueOn(habit: Habit, targetDate: DateType) {
	const repeat = habit.schedule.repeat;
	const habitStartDate = parseISO(habit.schedule.startDate);
	const startAndTargetAreSameDay = isSameDay(targetDate, habitStartDate);

	if (isBefore(targetDate, habitStartDate)) {
		return false;
	}

	if (!repeat) {
		return startAndTargetAreSameDay;
	}

	const duration = repeat.duration;

	const handleRepeatFrequency = (date: DateType) => {
		// TODO: encapsulate date-fns functions into date.ts library
		if (repeat.type === "day") {
			const dayDifference = differenceInDays(date, habitStartDate);
			return dayDifference % repeat.everyNumberOfDays === 0;
		} else {
			const weekday = getWeekday(date);
			const repeatWeekdays =
				repeat.daysOfWeek.length > 0 ? repeat.daysOfWeek : WEEKDAYS;

			if (!repeatWeekdays.includes(weekday)) {
				return false;
			}

			const dayDifference = differenceInDays(
				addWeeks(habitStartDate, repeat.everyNumberOfWeeks),
				habitStartDate,
			);

			return dayDifference % repeat.everyNumberOfWeeks === 0;
		}
	};

	if (duration.type === "untilDate") {
		const habitEndDate = parseISO(duration.endDate);
		if (isAfter(targetDate, habitEndDate)) {
			return false;
		}
	}

	if (duration.type === "afterOccurrences") {
		let occurrenceCount = 0;
		let currentDate = habitStartDate;
		const maxOccurences = duration.count;

		while (!isBefore(targetDate, currentDate)) {
			if (handleRepeatFrequency(currentDate)) {
				occurrenceCount++;
				if (isSameDay(currentDate, targetDate)) {
					return true;
				}
				if (occurrenceCount >= maxOccurences) {
					return false;
				}
			}

			currentDate = addDays(currentDate, 1);
		}

		return false;
	}

	return handleRepeatFrequency(targetDate);
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

	getHabits(date: DateType) {
		return this.repository
			.getAll()
			.map((habit) => habitToViewModel(habit, date));
	}

	getHabitsDueOnDate(date: DateType) {
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
		if (!currentHabit) {
			return;
		}
		this.repository.update(Object.assign(currentHabit, habit));
	}

	deleteHabit(id: string) {
		this.repository.delete(id);
	}

	toggleStatus(id: string, date: DateType) {
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

	toggleCompletion(id: string, date: DateType) {
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

	canToggleCompletion(id: string, date: DateType) {
		const habit = this.repository.get(id);
		return habit?.canToggleCompletion(date);
	}

	canToggleStatus(id: string, date: DateType) {
		const habit = this.repository.get(id);
		return habit?.canToggleStatus(date);
	}
}
