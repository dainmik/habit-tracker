import { defineConfig } from "drizzle-kit";

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
	throw new Error("DB_URL environment variable is not set.");
}

// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/model/schema.ts",
	dialect: "sqlite",
	casing: "snake_case",
	dbCredentials: {
		url: dbUrl,
	},
	verbose: true,
	strict: true,
});
