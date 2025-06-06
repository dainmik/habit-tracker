import { esLintBaseConfig } from "@repo/shared-config-eslint/base";
import { esLintVitestConfig } from "@repo/shared-config-eslint/vitest";
import { esLintVueConfig } from "@repo/shared-config-eslint/vue";

// eslint-disable-next-line import-x/no-default-export
export default [...esLintBaseConfig, ...esLintVueConfig, ...esLintVitestConfig];
