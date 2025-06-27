import { type ID } from "#model/common/domain/entity";
import type { HabitInputModel } from "#model/habit/application/habit-input-model";
import {
	HabitNotFoundError,
	ToggleHabitCompletionError,
	ToggleHabitStatusError,
} from "#model/habit/domain/errors";
import type { HabitRepository } from "#model/habit/domain/habit-repository";
import { type DateType } from "@repo/date";
import { mapFromHabitToDTO } from "./habit-dto.ts";
import { HabitMapper } from "./mapper.ts";

export class HabitService {
	repository: HabitRepository;

	constructor(repository: HabitRepository) {
		this.repository = repository;
	}

	async getHabit(id: string) {
		const habit = await this.repository.get(id);
		if (!habit) {
			throw new HabitNotFoundError({ habitId: id });
		}
		return habit;
	}

	async getHabits(date: DateType) {
		const habits = await this.repository.getAll();
		return habits.map((habit) => mapFromHabitToDTO(habit, date));
	}

	async getHabitsDueOnDate(date: DateType) {
		const habits = await this.repository.getAll();
		return habits
			.filter((habit) => habit.isHabitDueOn(date))
			.map((habit) => mapFromHabitToDTO(habit, date));
	}

	async addHabit(item: HabitInputModel) {
		const habit = HabitMapper.from(item, {});
		await this.repository.add(habit);
	}

	async editHabit(id: ID, item: HabitInputModel) {
		const habit = HabitMapper.from(item, { id });
		await this.repository.update(habit);
	}

	async deleteHabit(id: string) {
		await this.repository.delete(id);
	}

	async toggleStatus(id: string, date: DateType) {
		const habit = await this.getHabit(id);

		if (!habit.canToggleStatus(date)) {
			throw new ToggleHabitStatusError({
				habitId: id,
				date,
			});
		}

		habit.toggleStatus(date);

		await this.repository.update(habit);
	}

	async toggleCompletion(id: string, date: DateType) {
		const habit = await this.getHabit(id);

		if (!habit.canToggleCompletion(date)) {
			throw new ToggleHabitCompletionError({
				habitId: id,
				date,
			});
		}

		habit.toggleCompletion(date);

		await this.repository.update(habit);
	}

	async canToggleCompletion(id: string, date: DateType) {
		const habit = await this.repository.get(id);
		return habit?.canToggleCompletion(date);
	}

	async canToggleStatus(id: string, date: DateType) {
		const habit = await this.repository.get(id);
		return habit?.canToggleStatus(date);
	}
}
