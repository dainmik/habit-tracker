import { z } from "zod";

export const nodeEnvSchema = {
	CI: z.boolean().default(false),
	NODE_ENV: z.enum(["development", "production", "test"]),
};
