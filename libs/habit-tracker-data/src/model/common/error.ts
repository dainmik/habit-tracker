export abstract class HabitTrackerError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "HabitTrackerError";
	}
}
