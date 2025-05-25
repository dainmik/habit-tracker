<script setup lang="ts">
import PageNotFoundPage from "@/app/pages/page-not-found-page.vue";
import { HabitView } from "@/features/habit";
import { isValid, parseISO, startOfToday, type HabitDate } from "@/lib/date";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const currentDate = ref<HabitDate>();
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
	<PageNotFoundPage v-else />
</template>
