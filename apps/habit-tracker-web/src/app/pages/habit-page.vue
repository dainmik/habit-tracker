<script setup lang="ts">
import ErrorBoundary from "@/app/components/error-boundary.vue";
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
	<ErrorBoundary v-if="currentDate">
		<HabitView :date="currentDate" />
		<template #error>
			<div class="flex h-full flex-col items-center justify-center gap-4">
				<h2 class="text-2xl font-semibold">Ops... Something went wrong.</h2>
				<p class="text-center">Please contact the administrator.</p>
			</div>
		</template>
	</ErrorBoundary>
	<NotFoundPage v-else />
</template>
