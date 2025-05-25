<script setup lang="ts">
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import {
	DropdownMenuLabel,
	type DropdownMenuLabelProps,
	useForwardProps,
} from "reka-ui";

const props = defineProps<DropdownMenuLabelProps & { inset?: boolean }>();

const delegatedProps = reactiveOmit(props, "inset");
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<DropdownMenuLabel
		data-slot="dropdown-menu-label"
		:data-inset="inset ? '' : undefined"
		v-bind="forwardedProps"
		:class="cn('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8')"
	>
		<slot />
	</DropdownMenuLabel>
</template>
