import base from "@repo/shared-config-eslint/base";
import playwright from "@repo/shared-config-eslint/playwright";
import vue from "@repo/shared-config-eslint/vue";

// eslint-disable-next-line import-x/no-default-export
export default [...base, ...playwright, ...vue];
