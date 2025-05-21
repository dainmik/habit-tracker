<script setup lang="ts">
import DayButton from "./day-button.vue";

import { ref, onMounted, onBeforeUnmount } from "vue";
import { addDays, format } from "date-fns";

interface DateEntry {
	date: Date;
	iso: string;
	day: number;
	weekday: string;
}

const dateEntries = ref<DateEntry[]>([]);
const scroller = ref<HTMLDivElement | null>(null);
const sentinel = ref<HTMLDivElement | null>(null);

const BUFFER_DAYS = 7;
let offset = 0;

function generateDates(startOffset: number, count: number): DateEntry[] {
	return Array.from({ length: count }, (_, i) => {
		const date = addDays(new Date(), startOffset + i);
		return {
			date,
			iso: format(date, "yyyy-MM-dd"),
			day: date.getDate(),
			weekday: format(date, "EEE"),
		};
	});
}

function loadDates() {
	const newDates = generateDates(offset, BUFFER_DAYS);
	dateEntries.value.push(...newDates);
	offset += BUFFER_DAYS;
}

let observer: IntersectionObserver | null = null;

onMounted(() => {
	loadDates();

	if (!sentinel.value || !scroller.value) {
		return;
	}

	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadDates();
				}
			});
		},
		{
			root: scroller.value,
		},
	);
	observer.observe(sentinel.value);
});

onBeforeUnmount(() => {
	observer?.disconnect();
});
</script>

<template>
	<div ref="scroller" class="flex gap-1 overflow-x-auto p-2">
		<DayButton
			v-for="entry in dateEntries"
			:key="entry.iso"
			:weekday="entry.weekday"
			:day="entry.day"
		/>

		<div ref="sentinel" class="h-full w-[1px]"></div>
	</div>
</template>
