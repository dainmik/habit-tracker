import type { InjectionKey } from "vue";

export const FORM_FIELD_INJECTION_KEY = Symbol("FormField") as InjectionKey<{
	name: string;
}>;
export const FORM_ITEM_INJECTION_KEY = Symbol(
	"FormItem",
) as InjectionKey<string>;
