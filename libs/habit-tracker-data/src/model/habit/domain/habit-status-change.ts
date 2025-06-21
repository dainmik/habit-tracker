import { Entity } from "#model/common/domain/entity";
import { type DateType } from "@repo/date";

export const HABIT_STATUS = ["active", "paused"] as const;
export type HabitStatus = (typeof HABIT_STATUS)[number];

export class HabitStatusChange extends Entity {
	habitId: string;
	date: DateType;
	status: HabitStatus;

	constructor(habitId: string, date: DateType, status: HabitStatus) {
		super();
		this.habitId = habitId;
		this.date = date;
		this.status = status;
	}
}
