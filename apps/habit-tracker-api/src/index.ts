import { env } from "#env";
import { createAppRouterExpressMiddleware } from "@repo/habit-tracker-data/adapters/express";
import cors from "cors";
import express, { json } from "express";

const app = express();

app.use(cors());
app.use(json());
app.use(
	env.HABIT_TRACKER_API_BASE_PATH,
	createAppRouterExpressMiddleware({
		dbUrl: env.HABIT_TRACKER_DATA_DATABASE_URL,
	}),
);

app.listen(env.HABIT_TRACKER_API_PORT, () => {
	console.log(`Server running on port ${env.HABIT_TRACKER_API_PORT}`);
});
