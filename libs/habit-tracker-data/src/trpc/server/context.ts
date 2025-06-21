import type { DbClient } from "#db/client";
import { HabitService } from "#model/habit/application/habit-service";
import { SQLHabitRepository } from "#model/habit/infrastructure/sql-habit-repository";
import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type {
	Request as ExpressRequest,
	Response as ExpressResponse,
} from "express";

interface CreateTrpcCreateContextOptions {
	db: DbClient;
}

export const createTrpcCreateContext = ({
	db,
}: CreateTrpcCreateContextOptions) => {
	const habitRepository = new SQLHabitRepository(db);
	const habitService = new HabitService(habitRepository);

	return ({ req, res }: CreateExpressContextOptions): TrpcContext => {
		return {
			habitService,
			req,
			res,
		};
	};
};

export interface TrpcContext {
	habitService: HabitService;
	req: ExpressRequest;
	res: ExpressResponse;
}
