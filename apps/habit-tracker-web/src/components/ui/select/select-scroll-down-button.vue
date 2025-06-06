<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-vue-next";
import {
	SelectScrollDownButton,
	type SelectScrollDownButtonProps,
	useForwardProps,
} from "reka-ui";

const props = defineProps<SelectScrollDownButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
	<SelectScrollDownButton
		data-slot="select-scroll-down-button"
		v-bind="forwardedProps"
		:class="cn('flex cursor-default items-center justify-center py-1')"
	>
		<slot>
			<ChevronDown class="size-4" />
		</slot>
	</SelectScrollDownButton>
</template>
