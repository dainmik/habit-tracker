<script setup lang="ts">
import type { HabitDTO } from "@repo/habit-tracker-data/model";
import { ref } from "vue";

defineProps<{
	habits: HabitDTO[];
}>();

const expandedItemID = ref("");

const handleExpand = (id: string) => {
	expandedItemID.value = id;
};
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
			<slot
				:habit="habit"
				:expanded-item-i-d="expandedItemID"
				:handle-expand="handleExpand"
			/>
		</li>
	</ul>
</template>
