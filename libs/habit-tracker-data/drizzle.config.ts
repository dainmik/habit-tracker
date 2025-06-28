import { defineConfig } from "drizzle-kit";
import { env } from "./src/env.ts";

// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/model/schema.ts",
	dialect: "sqlite",
	casing: "snake_case",
	dbCredentials: {
		url: env.HABIT_TRACKER_DATA_DATABASE_URL,
	},
	verbose: true,
	strict: true,
});
