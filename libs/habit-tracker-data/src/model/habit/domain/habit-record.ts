import { Entity } from "#model/common/domain/entity";
import { currentDate, type DateType } from "@repo/date";

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
}
