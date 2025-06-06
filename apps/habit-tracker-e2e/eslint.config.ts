import { esLintBaseConfig } from "@repo/shared-config-eslint/base";
import { esLintPlaywrightConfig } from "@repo/shared-config-eslint/playwright";

// eslint-disable-next-line import-x/no-default-export
export default [...esLintBaseConfig, ...esLintPlaywrightConfig];
