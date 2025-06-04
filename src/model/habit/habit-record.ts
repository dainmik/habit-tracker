import { currentDate, parseISO, type DateType } from "@/lib/date";
import { Entity } from "@/model/entity";
import type { HabitRecordPersistenceModel } from "@/model/habit/habit-persistence-model";

export class HabitRecord extends Entity {
	habitId: string;
	date: DateType;
	completed: boolean;
	createdAt: DateType;

	constructor(habitId: string, date: DateType, completed: boolean) {
		super();
		this.habitId = habitId;
		this.date = date;
		this.completed = completed;
		this.createdAt = currentDate();
	}

	toDTO(): HabitRecordPersistenceModel {
		return {
			habitId: this.habitId,
			date: this.date.toISOString(),
			completed: this.completed,
		};
	}

	static fromDTO = (dto: HabitRecordPersistenceModel) => {
		return new HabitRecord(dto.habitId, parseISO(dto.date), dto.completed);
	};
}
