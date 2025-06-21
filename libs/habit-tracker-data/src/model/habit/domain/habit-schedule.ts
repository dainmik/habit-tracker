import { Entity } from "#model/common/domain/entity";
import { type DateType } from "@repo/date";
import type { Repeat } from "./habit-schedule-repeat.ts";

interface HabitScheduleProps {
	id?: string | undefined;
	habitId: string;
	startDate: DateType;
	repeat: Repeat | null;
}

export class HabitSchedule extends Entity {
	habitId: string;
	startDate: DateType;
	repeat: Repeat | null;

	constructor({ id, habitId, startDate, repeat }: HabitScheduleProps) {
		super(id);
		this.habitId = habitId;
		this.startDate = startDate;
		this.repeat = repeat;
	}
}
