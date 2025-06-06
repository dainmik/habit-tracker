import {
	addDays,
	convertDateToIso,
	parseISO,
	type DateType,
	type IsoDateString,
} from "@/lib/date";
import { ref } from "vue";

const generateDates = (
	startDate: DateType,
	bufferDays: number,
): IsoDateString[] => {
	const dates: IsoDateString[] = [];
	for (let i = -bufferDays; i <= bufferDays; i++) {
		const date = addDays(startDate, i);
		dates.push(convertDateToIso(date));
	}
	return dates;
};

export const useDateRange = (initialCenterDate: DateType, bufferDays = 5) => {
	const dates = ref<IsoDateString[]>([]);
	dates.value = generateDates(initialCenterDate, bufferDays);

	const addBefore = (baseISO: string) => {
		const base = parseISO(baseISO);
		const newDates = Array.from({ length: bufferDays }, (_, i) =>
			convertDateToIso(addDays(base, -i - 1)),
		).reverse();
		dates.value.unshift(...newDates);
	};

	const addAfter = (baseISO: string) => {
		const base = parseISO(baseISO);
		const newDates = Array.from({ length: bufferDays }, (_, i) =>
			convertDateToIso(addDays(base, i + 1)),
		);
		dates.value.push(...newDates);
	};

	return {
		dates,
		addBefore,
		addAfter,
	};
};
