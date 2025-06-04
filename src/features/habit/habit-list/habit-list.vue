<script setup lang="ts">
import type { HabitViewModel } from "@/model/habit/habit-view-model";

defineProps<{
	habits: HabitViewModel[];
}>();
</script>

<template>
	<div
		v-if="habits.length === 0"
		class="flex h-full items-center justify-center text-center text-3xl font-semibold"
	>
		No habits for this day!
	</div>

	<ul v-else class="-m-4 flex flex-col gap-2 overflow-y-auto p-4">
		<li v-for="habit of habits" :key="habit.id">
			<slot :habit="habit" />
		</li>
	</ul>
</template>
