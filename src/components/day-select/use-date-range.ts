import { nextTick, ref, type ShallowRef } from "vue";
import { format, addDays, parseISO } from "date-fns";

interface DateEntry {
	iso: string;
}

function dateToIso(date: Date) {
	return format(date, "yyyy-MM-dd");
}

function generateDates(startDate: Date, bufferDays: number): DateEntry[] {
	const dates: DateEntry[] = [];
	for (let i = -bufferDays; i <= bufferDays; i++) {
		const date = addDays(startDate, i);
		dates.push({ iso: dateToIso(date) });
	}
	return dates;
}

export function useDateRange(
	dateRefs: Readonly<ShallowRef<HTMLLIElement[] | null>>,
	centerDate: Date,
	bufferDays = 7,
) {
	const dateEntries = ref<DateEntry[]>([]);
	dateEntries.value = generateDates(centerDate, bufferDays);

	nextTick(() => {
		const dateRefsValues = dateRefs.value;
		if (!dateRefsValues) return;

		const index = dateEntries.value.findIndex(
			(dateEntry) => dateEntry.iso === dateToIso(centerDate),
		);
		dateRefsValues[index]?.scrollIntoView({
			behavior: "auto",
			inline: "center",
		});
	});

	function addBefore(baseISO: string) {
		const base = parseISO(baseISO);
		const newDates = Array.from({ length: bufferDays }, (_, i) => ({
			iso: dateToIso(addDays(base, -i - 1)),
		})).reverse();
		dateEntries.value.unshift(...newDates);
	}

	function addAfter(baseISO: string) {
		const base = parseISO(baseISO);
		const newDates = Array.from({ length: bufferDays }, (_, i) => ({
			iso: dateToIso(addDays(base, i + 1)),
		}));
		dateEntries.value.push(...newDates);
	}

	return {
		dates: dateEntries,
		addBefore,
		addAfter,
	};
}
