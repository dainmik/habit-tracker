<script setup lang="ts">
import { Button } from "@/components/ui/button";
import AddHabitFormDrawer from "@/features/habit/add-habit-form/add-habit-form-drawer.vue";
import DaySelect from "@/features/habit/day-select/day-select.vue";
import HabitListItem from "@/features/habit/habit-list/habit-list-item.vue";
import HabitList from "@/features/habit/habit-list/habit-list.vue";
import { useHabits } from "@/features/habit/use-habit";
import { type DateType } from "@/lib/date";
import { computed } from "vue";

const props = defineProps<{
	date: DateType;
}>();

const selectedDate = computed(() => props.date);

const {
	habitsDueOnDate,
	addHabit,
	deleteHabit,
	editHabit,
	toggleActiveStatus,
	toggleHabitCompletion,
} = useHabits(selectedDate);
</script>

<template>
	<DaySelect :selected-date="selectedDate" />

	<HabitList
		v-slot="{ habit, expandedItemID, handleExpand }"
		:habits="habitsDueOnDate"
	>
		<HabitListItem
			:date="selectedDate"
			:habit="habit"
			:on-toggle-completed="(id) => toggleHabitCompletion(id, selectedDate)"
			:on-toggle-status="(id) => toggleActiveStatus(id, selectedDate)"
			:on-edit="(id, updatedHabit) => editHabit(id, updatedHabit)"
			:on-delete="(id) => deleteHabit(id)"
			:expanded-item-i-d="expandedItemID"
			:on-expand="handleExpand"
		/>
	</HabitList>

	<AddHabitFormDrawer
		header-label="New habit"
		:selected-date="selectedDate"
		@submit="addHabit"
	>
		<template #trigger="{ open }">
			<div class="mt-auto w-full">
				<Button size="full" @click="open">Add Habit</Button>
			</div>
		</template>
	</AddHabitFormDrawer>
</template>
