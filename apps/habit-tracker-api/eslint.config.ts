import { esLintBaseConfig } from "@repo/shared-config-eslint/base";
import { esLintVitestConfig } from "@repo/shared-config-eslint/vitest";

// eslint-disable-next-line import-x/no-default-export
export default [...esLintBaseConfig, ...esLintVitestConfig];
