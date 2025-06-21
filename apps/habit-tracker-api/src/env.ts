import { z } from "zod";

const EnvSchema = z.object({
	API_SCHEMA: z.string(),
	API_HOST: z.string(),
	API_PORT: z.coerce.number(),
	API_BASE_PATH: z.string(),
	DB_URL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
	const issues = parsed.error.issues
		.map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
		.join("\n");

	const message = `❌ Invalid environment variables:\n${issues}`;
	const error = new Error(message);
	error.stack = "";
	throw error;
}

export const env = parsed.data;
