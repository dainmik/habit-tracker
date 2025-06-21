// import "dotenv/config";
import { schema } from "#model/schema";
import { drizzle } from "drizzle-orm/libsql";

// export const db = drizzle(process.env.DB_URL);

interface DbClientOptions {
	url: string;
}

export const createDbClient = ({ url }: DbClientOptions) => drizzle(url, { logger: true, schema, casing: "snake_case" });

export type DbClient = Awaited<ReturnType<typeof createDbClient>>;
