<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import DayButton from "./day-button.vue";
import { parseISO } from "date-fns";
import { useInfiniteScroll } from "./use-infinite-scroll";
import { useDateRange } from "./use-date-range";

const props = defineProps<{ iso: string }>();
const emits = defineEmits<{ (e: "dateSelected", iso: string): void }>();

const scroller = ref<HTMLElement | null>(null);
const startSentinel = ref<HTMLElement | null>(null);
const endSentinel = ref<HTMLElement | null>(null);
const currentISO = ref<string>(
	props.iso || new Date().toISOString().slice(0, 10),
);

const itemsRefs = useTemplateRef("items");

const { dates, addAfter, addBefore } = useDateRange(
	itemsRefs,
	parseISO(currentISO.value),
);

useInfiniteScroll(
	scroller,
	startSentinel,
	endSentinel,
	async () => {
		const first = dates.value.at(0)?.iso;
		if (first) {
			addBefore(first);
		}
	},
	() => {
		const last = dates.value.at(-1)?.iso;
		if (last) {
			addAfter(last);
		}
	},
);
</script>

<template>
	<ul ref="scroller" class="flex gap-1 overflow-x-auto p-2">
		<div ref="startSentinel" class="h-full w-[1px]"></div>

		<li v-for="entry in dates" :key="entry.iso" class="flex" ref="items">
			<DayButton
				:iso="entry.iso"
				:is-active="entry.iso === currentISO"
				@pressed="
					(iso) => {
						currentISO = iso;
						emits('dateSelected', iso);
					}
				"
			/>
		</li>

		<div ref="endSentinel" class="h-full w-[1px]"></div>
	</ul>
</template>
