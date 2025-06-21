/// <reference types="vite/client" />

interface ViteTypeOptions {
	// Make the type of ImportMetaEnv strict to disallow unknown keys.
	strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
	readonly VITE_API_SCHEMA: string;
	readonly VITE_API_HOST: string;
	readonly VITE_API_PORT: string;
	readonly VITE_API_BASE_PATH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
