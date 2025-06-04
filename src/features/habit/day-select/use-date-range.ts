import {
	addDays,
	convertDateToIso,
	parseISO,
	type DateType,
	type IsoDateString,
} from "@/lib/date";
import { nextTick, ref, type ShallowRef } from "vue";

function generateDates(
	startDate: DateType,
	bufferDays: number,
): IsoDateString[] {
	const dates: IsoDateString[] = [];
	for (let i = -bufferDays; i <= bufferDays; i++) {
		const date = addDays(startDate, i);
		dates.push(convertDateToIso(date));
	}
	return dates;
}

export function useDateRange(
	dateRefs: Readonly<ShallowRef<HTMLLIElement[] | null>>,
	centerDate: DateType,
	bufferDays = 5,
) {
	const dates = ref<IsoDateString[]>([]);
	dates.value = generateDates(centerDate, bufferDays);

	void nextTick(() => {
		const dateRefsValues = dateRefs.value;
		if (!dateRefsValues) return;

		const index = dates.value.indexOf(convertDateToIso(centerDate));
		dateRefsValues[index]?.scrollIntoView({
			behavior: "auto",
			inline: "center",
		});
	});

	function addBefore(baseISO: string) {
		const base = parseISO(baseISO);
		const newDates = Array.from({ length: bufferDays }, (_, i) =>
			convertDateToIso(addDays(base, -i - 1)),
		).reverse();
		dates.value.unshift(...newDates);
	}

	function addAfter(baseISO: string) {
		const base = parseISO(baseISO);
		const newDates = Array.from({ length: bufferDays }, (_, i) =>
			convertDateToIso(addDays(base, i + 1)),
		);
		dates.value.push(...newDates);
	}

	return {
		dates: dates,
		addBefore,
		addAfter,
	};
}
