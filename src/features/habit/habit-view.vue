<script setup lang="ts">
import { Button } from "@/components/ui/button";
import AddHabitFormDrawer from "@/features/habit/add-habit-form/add-habit-form-drawer.vue";
import DaySelect from "@/features/habit/day-select/day-select.vue";
import HabitListItem from "@/features/habit/habit-list/habit-list-item.vue";
import HabitList from "@/features/habit/habit-list/habit-list.vue";
import { seedHabits } from "@/features/habit/seed";
import { useHabits } from "@/features/habit/use-habit";
import { type HabitDate } from "@/lib/date";
import { ref, watchEffect } from "vue";

const props = defineProps<{
	date: HabitDate;
}>();

const selectedDay = ref(props.date);
watchEffect(() => {
	selectedDay.value = props.date;
});

const {
	habits,
	habitsDueOnDate,
	addHabit,
	deleteHabit,
	editHabit,
	toggleActiveStatus,
	toggleHabitCompletion,
} = useHabits(selectedDay);

if (habits.value.length === 0) {
	seedHabits();
}
</script>

<template>
	<DaySelect
		:selected-date="selectedDay"
		@date-selected="
			(date) => {
				selectedDay = date;
			}
		"
	/>

	<HabitList v-slot="{ habit }" :habits="habitsDueOnDate">
		<HabitListItem
			:date="selectedDay"
			:habit="habit"
			:on-toggle-completed="(id) => toggleHabitCompletion(id, selectedDay)"
			:on-toggle-status="(id) => toggleActiveStatus(id, selectedDay)"
			:on-edit="(id, updatedHabit) => editHabit(id, updatedHabit)"
			:on-delete="(id) => deleteHabit(id)"
		/>
	</HabitList>

	<AddHabitFormDrawer header-label="New habit" @submit="addHabit">
		<template #trigger="{ open }">
			<Button @click="open">Add Habit</Button>
		</template>
	</AddHabitFormDrawer>
</template>
