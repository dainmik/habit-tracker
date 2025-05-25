<script setup lang="ts">
import DrawerDialog from "@/components/ui/drawer-dialog/drawer-dialog.vue";
import AddHabitForm from "@/features/habit/add-habit-form/add-habit-form.vue";
import type { HabitInputModel } from "@/model/habit/habit-input-model";
import type { HabitViewModel } from "@/model/habit/habit-view-model";

const props = defineProps<{
	headerLabel: string;
	habit?: HabitViewModel;
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
