<script setup lang="ts">
import type { toggleVariants } from "@/components/toggle";
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import type { VariantProps } from "class-variance-authority";
import {
	ToggleGroupRoot,
	type ToggleGroupRootEmits,
	type ToggleGroupRootProps,
	useForwardPropsEmits,
} from "reka-ui";
import { provide } from "vue";

type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

const props = defineProps<
	ToggleGroupRootProps & {
		variant?: ToggleGroupVariants["variant"];
		size?: ToggleGroupVariants["size"];
	}
>();
const emits = defineEmits<ToggleGroupRootEmits>();

provide("toggleGroup", {
	variant: props.variant,
	size: props.size,
});

const delegatedProps = reactiveOmit(props, "size", "variant");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<ToggleGroupRoot
		v-slot="slotProps"
		data-slot="toggle-group"
		:data-size="size"
		:data-variant="variant"
		v-bind="forwarded"
		:class="
			cn(
				'group/toggle-group flex w-full items-center rounded-md data-[variant=outline]:shadow-xs',
			)
		"
	>
		<slot v-bind="slotProps" />
	</ToggleGroupRoot>
</template>
