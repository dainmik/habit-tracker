import type { TSESLint } from "@typescript-eslint/utils";

export type ESLintConfigRuleEntries = Record<string, TSESLint.Linter.RuleEntry>;

export const defineRuleEntries = (rules: ESLintConfigRuleEntries) => rules;
