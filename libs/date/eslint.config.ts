import { esLintBaseConfig } from "@repo/shared-config-eslint/base";
import { esLintVueConfig } from "@repo/shared-config-eslint/vue";

// eslint-disable-next-line import-x/no-default-export
export default [...esLintBaseConfig, ...esLintVueConfig];
