import type { TSESLint } from "@typescript-eslint/utils";

type RuleEntry = TSESLint.Linter.RuleEntry;

export type Rules = Record<string, RuleEntry>;
