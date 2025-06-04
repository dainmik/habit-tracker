import { nextTick, onMounted, onUnmounted, type Ref } from "vue";

export function useInfiniteScroll(
	scroller: Ref<HTMLElement | undefined>,
	startSentinel: Ref<HTMLElement | undefined>,
	endSentinel: Ref<HTMLElement | undefined>,
	onReachStart: () => Promise<void> | void,
	onReachEnd: () => void,
) {
	let startObserver: IntersectionObserver | undefined;
	let endObserver: IntersectionObserver | undefined;

	const rootMargin = 200;

	onMounted(async () => {
		await nextTick();
		if (!scroller.value || !startSentinel.value || !endSentinel.value) return;

		startObserver = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;

				void (async () => {
					if (!scroller.value) return;

					const scrollLeft = scroller.value.scrollLeft;
					const scrollWidth = scroller.value.scrollWidth;

					await onReachStart();

					await nextTick();

					const newScrollWidth = scroller.value.scrollWidth;
					scroller.value.scrollLeft =
						scrollLeft + (newScrollWidth - scrollWidth);
				})();
			},
			{
				root: scroller.value,
				rootMargin: `0px 0px 0px ${rootMargin}px`,
			},
		);
		startObserver.observe(startSentinel.value);

		endObserver = new IntersectionObserver(
			(entries) => {
				if (!entries.some((e) => e.isIntersecting)) return;

				onReachEnd();
			},
			{
				root: scroller.value,
				rootMargin: `0px ${rootMargin}px 0px 0px`,
			},
		);
		endObserver.observe(endSentinel.value);
	});

	onUnmounted(() => {
		startObserver?.disconnect();
		endObserver?.disconnect();
	});
}
