<script setup lang="ts">
import {
	DateFormatter,
	type DateValue,
	getLocalTimeZone,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ref, watch } from "vue";

const model = defineModel<string>();

const value = ref<DateValue>();

watch(value, (newValue) => {
	model.value = newValue?.toString();
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
