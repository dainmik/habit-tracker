<script lang="ts" setup>
import { buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";
import { reactiveOmit } from "@vueuse/core";
import { ChevronLeft } from "lucide-vue-next";
import { CalendarPrev, type CalendarPrevProps, useForwardProps } from "reka-ui";
import type { HTMLAttributes } from "vue";

const props = defineProps<
	CalendarPrevProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<CalendarPrev
		data-slot="calendar-prev-button"
		:class="
			cn(buttonVariants({ variant: 'outline' }), 'size-7 p-0', props.class)
		"
		v-bind="forwardedProps"
	>
		<slot>
			<ChevronLeft class="size-4" />
		</slot>
	</CalendarPrev>
</template>
