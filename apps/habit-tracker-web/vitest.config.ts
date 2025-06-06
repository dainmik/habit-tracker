import { uiConfig } from "@repo/shared-config-vitest/ui";
import { mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

// eslint-disable-next-line import-x/no-default-export
export default mergeConfig(viteConfig, uiConfig);
