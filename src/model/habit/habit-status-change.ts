import { parseISO } from "@/lib/date";
import { Entity } from "@/model/entity";
import type { HabitStatusChangePersistenceModel } from "@/model/habit/habit-persistence-model";

export type HabitStatus = "active" | "paused";

export class HabitStatusChange extends Entity {
	habitId: string;
	date: Date;
	status: HabitStatus;

	constructor(habitId: string, date: Date, status: HabitStatus) {
		super();
		this.habitId = habitId;
		this.date = date;
		this.status = status;
	}

	toDTO(): HabitStatusChangePersistenceModel {
		return {
			habitId: this.habitId,
			date: this.date.toISOString(),
			status: this.status,
		};
	}

	static fromDTO = (dto: HabitStatusChangePersistenceModel) => {
		return new HabitStatusChange(dto.habitId, parseISO(dto.date), dto.status);
	};
}
