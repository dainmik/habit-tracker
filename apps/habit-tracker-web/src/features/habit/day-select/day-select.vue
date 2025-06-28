<script setup lang="ts">
import {
	RovingFocusGroup,
	RovingFocusItem,
} from "@/components/ui/roving-focus";
import DayButton from "@/features/habit/day-select/day-button.vue";
import { useDateRange } from "@/features/habit/day-select/use-date-range";
import { useInfiniteScroll } from "@/features/habit/day-select/use-infinite-scroll";
import { ICONS } from "@/lib/icons";
import { Icon } from "@iconify/vue";
import {
	convertDateToIso,
	type DateType,
	type IsoDateString,
} from "@repo/date";
import { nextTick, ref, useTemplateRef, watch } from "vue";

const props = defineProps<{ selectedDate: DateType }>();

const scroller = ref<HTMLElement>();
const startSentinel = ref<HTMLElement>();
const endSentinel = ref<HTMLElement>();
const itemsRefs = useTemplateRef("items");

let hasRun = false;
watch([itemsRefs, () => props.selectedDate], () => {
	void nextTick(() => {
		const dateRefsValues = itemsRefs.value;
		if (!dateRefsValues) return;

		const element = itemsRefs.value.find(
			(element) => element.id === convertDateToIso(props.selectedDate),
		);

		element?.scrollIntoView({
			behavior: hasRun ? "smooth" : "instant",
			block: "center",
			inline: "center",
		});

		hasRun = true;
	});
});

const { dates, addAfter, addBefore } = useDateRange(props.selectedDate);
useInfiniteScroll(
	scroller,
	startSentinel,
	endSentinel,
	() => {
		const first = dates.value.at(0);
		if (first) {
			addBefore(first);
		}
	},
	() => {
		const last = dates.value.at(-1);
		if (last) {
			addAfter(last);
		}
	},
);

const scrollByPage = (direction: "left" | "right") => {
	const container = scroller.value;
	const items = itemsRefs.value;

	if (!container || !items?.length) return;

	// We assume all buttons have equal width
	const childWidth = (items[0] as HTMLElement).offsetWidth;

	const visibleCount = Math.floor(container.clientWidth / childWidth);

	const scrollDistance = childWidth * visibleCount;

	container.scrollBy({
		left: direction === "right" ? scrollDistance : -scrollDistance,
		behavior: "smooth",
	});
};

const isButtonActive = (iso: IsoDateString) =>
	iso === convertDateToIso(props.selectedDate);
</script>

<template>
	<div>
		<div class="text-muted-foreground text-xs font-bold uppercase">
			{{
				// TODO: this should be encapsulated into the date library as well.
				selectedDate.toLocaleDateString(undefined, {
					year: "numeric",
					month: "long",
				})
			}}
		</div>
		<nav class="flex w-full items-center gap-2">
			<button
				title="See more earlier dates"
				class="size-12 cursor-pointer rounded-md hover:scale-125 focus-visible:scale-125"
				@click="scrollByPage('left')"
			>
				<Icon :icon="ICONS.arrowHeadRight" class="shrink-0 rotate-180" />
			</button>

			<div class="relative flex-grow overflow-hidden">
				<RovingFocusGroup>
					<ul
						ref="scroller"
						class="fade-scroll-mask scrollbar-none flex gap-1 overflow-x-auto p-2"
					>
						<div ref="startSentinel" class="h-full w-[1px]"></div>

						<li
							v-for="iso in dates"
							:id="iso"
							:key="iso"
							ref="items"
							class="flex"
						>
							<RovingFocusItem :focused-initially="isButtonActive(iso)">
								<DayButton :iso="iso" :is-active="isButtonActive(iso)" />
							</RovingFocusItem>
						</li>

						<div ref="endSentinel" class="h-full w-[1px]"></div>
					</ul>
				</RovingFocusGroup>
			</div>

			<button
				title="See more later dates"
				class="size-12 cursor-pointer rounded-md hover:scale-125 focus-visible:scale-125"
				@click="scrollByPage('right')"
			>
				<Icon :icon="ICONS.arrowHeadRight" class="shrink-0" />
			</button>
		</nav>
	</div>
</template>

<style scoped>
.fade-scroll-mask {
	mask-image: linear-gradient(
		to right,
		transparent,
		black 24px,
		black calc(100% - 24px),
		transparent
	);
	mask-size: 100% 100%;
	mask-repeat: no-repeat;
}
</style>
