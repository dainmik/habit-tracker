import { EnvSchema } from "#env";

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvSchema {}
	}
}

export {};
