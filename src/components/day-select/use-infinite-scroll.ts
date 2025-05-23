import { onMounted, onBeforeUnmount, nextTick, type Ref } from "vue";

export function useInfiniteScroll(
	scroller: Ref<HTMLElement | null>,
	startSentinel: Ref<HTMLElement | null>,
	endSentinel: Ref<HTMLElement | null>,
	onReachStart: () => Promise<void> | void,
	onReachEnd: () => void,
) {
	let startObserver: IntersectionObserver | null = null;
	let endObserver: IntersectionObserver | null = null;

	onMounted(async () => {
		await nextTick();
		if (!scroller.value || !startSentinel.value || !endSentinel.value) return;

		startObserver = new IntersectionObserver(
			async (entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;

				const scrollLeft = scroller.value!.scrollLeft;
				const scrollWidth = scroller.value!.scrollWidth;

				await onReachStart();

				await nextTick();

				const newScrollWidth = scroller.value!.scrollWidth;
				scroller.value!.scrollLeft =
					scrollLeft + (newScrollWidth - scrollWidth);
			},
			{ root: scroller.value },
		);
		startObserver.observe(startSentinel.value);

		endObserver = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;

				onReachEnd();
			},
			{ root: scroller.value },
		);
		endObserver.observe(endSentinel.value);
	});

	onBeforeUnmount(() => {
		startObserver?.disconnect();
		endObserver?.disconnect();
	});
}
