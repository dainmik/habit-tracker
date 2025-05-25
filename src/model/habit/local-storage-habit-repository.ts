import { LocalStorage } from "@/adapters/local-storage";
import { Habit } from "@/model/habit/habit";
import type { HabitPersistenceModel } from "@/model/habit/habit-persistence-model";
import type { HabitRepository } from "./habit-repository";

export class LocalStorageHabitRepository implements HabitRepository {
	private store = new LocalStorage<HabitPersistenceModel[]>("habits", []);

	get(id: string) {
		const dto = this.store.get().find((habit) => habit.id === id);
		if (!dto) return;

		return Habit.fromDTO(dto);
	}

	getAll() {
		const dtos = this.store.get();
		return dtos.map((dto) => Habit.fromDTO(dto));
	}

	add(habit: Habit) {
		const value = this.store.get();
		value.push(habit.toDTO());

		this.store.set(value);
	}

	update(habit: Habit) {
		const index = this.store
			.get()
			.findIndex((currentHabit) => currentHabit.id === habit.id);
		if (index !== -1) {
			const value = this.store.get();
			value[index] = habit.toDTO();
			this.store.set(value);
		}
	}

	delete(id: string) {
		this.store.set(this.store.get().filter((habit) => habit.id !== id));
	}
}
