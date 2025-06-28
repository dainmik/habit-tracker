<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-vue-next";
import {
	SelectScrollUpButton,
	type SelectScrollUpButtonProps,
	useForwardProps,
} from "reka-ui";

const props = defineProps<SelectScrollUpButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
	<SelectScrollUpButton
		data-slot="select-scroll-up-button"
		v-bind="forwardedProps"
		:class="cn('flex cursor-pointer items-center justify-center py-1')"
	>
		<slot>
			<ChevronUp class="size-4" />
		</slot>
	</SelectScrollUpButton>
</template>
