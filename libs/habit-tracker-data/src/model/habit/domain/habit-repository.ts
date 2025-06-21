import type { Habit } from "#model/habit/domain/habit";

export interface HabitRepository {
	get(id: string): Promise<Habit | undefined>;
	getAll(): Promise<Habit[]>;
	add(habit: Habit): Promise<void>;
	update(habit: Habit): Promise<void>;
	delete(id: string): Promise<void>;
}
