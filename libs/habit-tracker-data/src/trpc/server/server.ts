import type { TrpcContext } from "#trpc/server/context";
import { initTRPC } from "@trpc/server";

const t = initTRPC.context<TrpcContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
