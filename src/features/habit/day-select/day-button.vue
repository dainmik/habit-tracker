<script setup lang="ts">
import {
	getDayOfMonthNumber,
	getWeekdayNameTruncated,
	parseISO,
	type IsoDateString,
} from "@/lib/date";
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
	iso: IsoDateString;
	isActive: boolean;
}>();

const date = computed(() => parseISO(props.iso));
const weekday = computed(() => getWeekdayNameTruncated(date.value));
const day = computed(() => getDayOfMonthNumber(date.value));
</script>

<template>
	<RouterLink
		class="bg-card flex min-w-[3rem] flex-col gap-1 rounded-lg border p-2 text-center transition-all"
		:class="{
			'border-primary mx-1.25 scale-120': props.isActive,
		}"
		:to="`/day/${iso}`"
	>
		<div class="text-muted-foreground text-xs font-bold uppercase">
			{{ weekday }}
		</div>
		<div class="text-sm font-semibold">{{ day }}</div>
	</RouterLink>
</template>
