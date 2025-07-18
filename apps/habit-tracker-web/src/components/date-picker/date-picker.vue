<script setup lang="ts">
import {
	DateFormatter,
	getLocalTimeZone,
	parseDate,
	type DateValue,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";

import { Button } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { cn } from "@/lib/utils";
import { convertDateToIso, parseISO, type DateType } from "@repo/date";
import { onMounted, ref, watch } from "vue";

const model = defineModel<DateType>();

const value = ref<DateValue>();

onMounted(() => {
	if (!model.value) {
		return;
	}
	value.value = parseDate(convertDateToIso(model.value));
});

watch(value, (newValue) => {
	model.value = newValue ? parseISO(newValue.toString()) : undefined;
});

const df = new DateFormatter("en-US", {
	dateStyle: "long",
});
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				:class="
					cn(
						'w-[280px] justify-start text-left font-normal',
						!value && 'text-muted-foreground',
					)
				"
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{{ value && df.format(value.toDate(getLocalTimeZone())) }}
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0">
			<Calendar v-model="value" initial-focus />
		</PopoverContent>
	</Popover>
</template>
