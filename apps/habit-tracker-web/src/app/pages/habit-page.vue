<script setup lang="ts">
import NotFoundPage from "@/app/pages/not-found-page.vue";
import { HabitView } from "@/features/habit";
import { isValid, parseISO, startOfToday, type DateType } from "@/lib/date";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const currentDate = ref<DateType>();
const route = useRoute();
watch(
	() => route.params.date,
	(newDate) => {
		if (typeof newDate === "string" && newDate && !isValid(newDate)) {
			currentDate.value = undefined;
		} else {
			currentDate.value = newDate
				? parseISO(newDate as string)
				: startOfToday();
		}
	},
	{ immediate: true },
);
</script>

<template>
	<HabitView v-if="currentDate" :date="currentDate" />
	<NotFoundPage v-else />
</template>
