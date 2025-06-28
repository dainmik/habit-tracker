<script lang="ts">
export const toggleVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap cursor-pointer",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-9 px-2 min-w-9",
				sm: "h-8 px-1.5 min-w-8",
				lg: "h-10 px-2.5 min-w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export type ToggleVariants = VariantProps<typeof toggleVariants>;
</script>

<script setup lang="ts">
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import { cva, type VariantProps } from "class-variance-authority";
import {
	Toggle,
	type ToggleEmits,
	type ToggleProps,
	useForwardPropsEmits,
} from "reka-ui";

const props = withDefaults(
	defineProps<
		ToggleProps & {
			variant?: ToggleVariants["variant"];
			size?: ToggleVariants["size"];
		}
	>(),
	{
		variant: "default",
		size: "default",
		disabled: false,
	},
);

const emits = defineEmits<ToggleEmits>();

const delegatedProps = reactiveOmit(props, "size", "variant");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<Toggle
		v-slot="slotProps"
		data-slot="toggle"
		v-bind="forwarded"
		:class="cn(toggleVariants({ variant, size }))"
	>
		<slot v-bind="slotProps" />
	</Toggle>
</template>
