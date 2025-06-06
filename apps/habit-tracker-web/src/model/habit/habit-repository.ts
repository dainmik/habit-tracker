import type { Habit } from "@/model/habit/habit";

export interface HabitRepository {
	get(id: string): Habit | undefined;
	getAll(): Habit[];
	add(habit: Habit): void;
	update(habit: Habit): void;
	delete(id: string): void;
}
