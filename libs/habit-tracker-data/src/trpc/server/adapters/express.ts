import { createDbClient } from "#db/client";
import { appRouter } from "#model/app-router";
import { createTrpcCreateContext } from "#trpc/server/context";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import type { Handler } from "express";

interface CreateAppRouterMiddlewareOptions {
	dbUrl: string;
}

export const createAppRouterExpressMiddleware = ({
	dbUrl,
}: CreateAppRouterMiddlewareOptions): Handler => {
	const db = createDbClient({ url: dbUrl });

	return createExpressMiddleware({
		router: appRouter,
		createContext: createTrpcCreateContext({ db }),
	});
};
