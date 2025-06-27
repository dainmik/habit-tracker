import { schema } from "#model/schema";
import { drizzle } from "drizzle-orm/libsql";

interface DbClientOptions {
	url: string;
}

export const createDbClient = ({ url }: DbClientOptions) =>
	drizzle(url, { logger: true, schema, casing: "snake_case" });

export type DbClient = Awaited<ReturnType<typeof createDbClient>>;
