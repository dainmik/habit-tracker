<script setup lang="ts">
import DrawerDialog from "@/components/ui/drawer-dialog/drawer-dialog.vue";
import AddHabitForm from "@/features/habit/add-habit-form/add-habit-form.vue";
import type { DateType } from "@repo/date";
import type { HabitInputModel } from "@repo/habit-tracker-data/model";

const props = defineProps<{
	headerLabel: string;
	habit: HabitInputModel | null;
	selectedDate: DateType;
}>();

const emits = defineEmits<{
	submit: [habit: HabitInputModel];
}>();
</script>

<template>
	<DrawerDialog :header-label="props.headerLabel">
		<template #trigger="{ open }">
			<slot name="trigger" :open="open" />
		</template>

		<template #default="{ close }">
			<AddHabitForm
				:habit="props.habit"
				:selected-date="selectedDate"
				@submit="
					(habit) => {
						close();
						emits('submit', habit);
					}
				"
			/>
		</template>
	</DrawerDialog>
</template>
