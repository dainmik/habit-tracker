<script setup lang="ts">
import DayButton from "./day-button.vue";

import { ref, onMounted, onBeforeUnmount } from "vue";
import { addDays, format } from "date-fns";
import { useRoute } from "vue-router";

interface DateEntry {
	iso: string;
}

const emits = defineEmits<{
	(e: "dateSelected", iso: string): void;
}>();

const dateEntries = ref<DateEntry[]>([]);
const currentDateISO = ref<string>();
const scroller = ref<HTMLDivElement | null>(null);
const sentinel = ref<HTMLDivElement | null>(null);

const isActive = (iso: string) => iso === currentDateISO.value;

const route = useRoute();

const BUFFER_DAYS = 7;
let offset = 0;

function generateDates(startOffset: number, count: number): DateEntry[] {
	return Array.from({ length: count }, (_, i) => {
		const date = addDays(new Date(), startOffset + i);
		return {
			iso: format(date, "yyyy-MM-dd"),
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
	currentDateISO.value =
		(route.params.iso as string) || dateEntries.value[0].iso;

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
			:iso="entry.iso"
			:is-active="isActive(entry.iso)"
			@pressed="
				(iso) => {
					currentDateISO = iso;
					emits('dateSelected', iso);
				}
			"
		/>

		<div ref="sentinel" class="h-full w-[1px]"></div>
	</div>
</template>
