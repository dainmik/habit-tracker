import { env } from "#env";
import { createAppRouterExpressMiddleware } from "@repo/habit-tracker-data/adapters/express";
import cors from "cors";
import express, { json } from "express";

const app = express();

app.use(cors());
app.use(json());
app.use(
	env.API_BASE_PATH,
	createAppRouterExpressMiddleware({
		dbUrl: env.DB_URL,
	}),
);

app.listen(env.API_PORT, () => {
	console.log(`Server running on port ${env.API_PORT}`);
});
