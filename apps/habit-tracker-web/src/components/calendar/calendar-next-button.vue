<script lang="ts" setup>
import { buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import { ChevronRight } from "lucide-vue-next";
import { CalendarNext, type CalendarNextProps, useForwardProps } from "reka-ui";
import type { HTMLAttributes } from "vue";

const props = defineProps<
	CalendarNextProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<CalendarNext
		data-slot="calendar-next-button"
		:class="
			cn(buttonVariants({ variant: 'outline' }), 'size-7 p-0', props.class)
		"
		v-bind="forwardedProps"
	>
		<slot>
			<ChevronRight class="size-4" />
		</slot>
	</CalendarNext>
</template>
