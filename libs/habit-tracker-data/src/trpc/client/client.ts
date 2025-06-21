import type { AppRouter } from "#model/app-router";
import { createTRPCClient as _createTRPCClient, httpLink } from "@trpc/client";

interface CreateTRPClientOptions {
	url: string;
}

export const createTRPClient = ({ url }: CreateTRPClientOptions) =>
	_createTRPCClient<AppRouter>({
		links: [
			httpLink({
				url,
			}),
		],
	});
