<script setup lang="ts">
import AddHabitFormDrawer from "@/features/habit/add-habit-form/add-habit-form-drawer.vue";
import { type HabitDate } from "@/lib/date";
import { ICONS } from "@/lib/icons";
import type { HabitInputModel } from "@/model/habit/habit-input-model";
import type { HabitViewModel } from "@/model/habit/habit-view-model";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

defineProps<{
	date: HabitDate;
	habit: HabitViewModel;
	onToggleCompleted: (id: string) => void;
	onEdit: (id: string, updatedHabit: HabitInputModel) => void;
	onToggleStatus: (id: string) => void;
	onDelete: (id: string) => void;
}>();

const expandedItemID = ref("");

const handleToggleExpanded = (id: string) => {
	const value = expandedItemID.value === id ? "" : id;
	expandedItemID.value = value;
};

const isExpanded = (habitID: string) => expandedItemID.value === habitID;

const HABIT_NAME_ICONS = {
	inProgress: {
		icon: ICONS.check,
		class: "text-green-500",
	},
	completed: {
		icon: ICONS.cross,
		class: "text-red-500",
	},
};

const iconInfo = (habit: HabitViewModel) => {
	return habit.completed
		? HABIT_NAME_ICONS.completed
		: HABIT_NAME_ICONS.inProgress;
};
</script>
<template>
	<button
		class="h-full w-full rounded-2xl border"
		:aria-label="habit.name"
		:class="{
			'opacity-60': habit.activeStatus === 'paused',
		}"
		@click="handleToggleExpanded(habit.id)"
	>
		<div
			class="bg-card text-card-foreground flex flex-col gap-6 rounded-2xl p-3 shadow-sm"
			:class="{
				'bg-primary/30': habit.completed,
				'bg-red-500/30': !habit.wasCompleted,
			}"
		>
			<div class="flex items-center justify-between">
				{{ habit.name }}
				<Icon
					:icon="ICONS.arrowHeadRight"
					:class="[isExpanded(habit.id) ? 'rotate-90' : 'rotate-180']"
				/>
			</div>

			<div v-if="isExpanded(habit.id)" class="flex justify-between gap-4">
				<button
					v-if="habit.canToggleCompletion"
					id="toggle-completion"
					:aria-label="
						habit.completed
							? 'Mark habit as incomplete'
							: 'Mark habit as complete'
					"
					@click.stop="onToggleCompleted(habit.id)"
				>
					<Icon
						class="text-4xl"
						:icon="iconInfo(habit).icon"
						:class="iconInfo(habit).class"
					/>
				</button>

				<AddHabitFormDrawer
					header-label="Edit habit"
					:habit="habit"
					@submit="(updatedHabit) => onEdit(habit.id, updatedHabit)"
				>
					<template #trigger="{ open }">
						<button @click.stop="open">
							<Icon
								aria-label="Edit habit"
								:icon="ICONS.edit"
								class="text-2xl"
							/>
						</button>
					</template>
				</AddHabitFormDrawer>

				<button
					v-if="habit.canToggleStatus"
					:aria-label="
						habit.activeStatus === 'active'
							? 'Mark habit as inactive'
							: 'Mark habit as active'
					"
					@click.stop="onToggleStatus(habit.id)"
				>
					<Icon
						:icon="habit.activeStatus === 'active' ? ICONS.pause : ICONS.resume"
						class="text-3xl"
					/>
				</button>

				<button aria-label="Delete habit" @click.stop="onDelete(habit.id)">
					<Icon :icon="ICONS.delete" class="text-2xl text-red-500" />
				</button>
			</div>
		</div>
	</button>
</template>
