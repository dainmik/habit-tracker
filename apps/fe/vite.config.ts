import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
	plugins: [tailwindcss(), vue(), vueDevTools()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("src", import.meta.url)),
		},
	},
	server: {
		port: 5173,
		host: "127.0.0.1",
	},
	build: {
		target: "es2024",
	},
});
