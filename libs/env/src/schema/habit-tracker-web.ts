import { z } from "zod";

const HABIT_TRACKER_WEB_SCHEMA = z.string();
const HABIT_TRACKER_WEB_HOST = z.string();
const HABIT_TRACKER_WEB_PORT = z.coerce.number().positive();

export const habitTrackerWebEnvSchema = {
	HABIT_TRACKER_WEB_SCHEMA,
	HABIT_TRACKER_WEB_HOST,
	HABIT_TRACKER_WEB_PORT,
};
