<script setup lang="ts">
import AddHabitFormDrawer from "@/features/habit/add-habit-form/add-habit-form-drawer.vue";
import { ICONS } from "@/lib/icons";
import { Icon } from "@iconify/vue";
import { type DateType } from "@repo/date";
import type { HabitDTO, HabitInputModel } from "@repo/habit-tracker-data/model";
import { useTemplateRef } from "vue";

const props = defineProps<{
	date: DateType;
	habit: HabitDTO;
	onToggleCompleted: (id: string) => void;
	onEdit: (id: string, updatedHabit: HabitInputModel) => void;
	onToggleStatus: (id: string) => void;
	onDelete: (id: string) => void;
	expandedItemID: string;
	onExpand: (id: string) => void;
}>();

const itemRef = useTemplateRef("item");

const handleToggleExpanded = (id: string) => {
	props.onExpand(props.expandedItemID === id ? "" : id);
	itemRef.value?.scrollIntoView({ behavior: "smooth" });
};

const isExpanded = (habitID: string) => props.expandedItemID === habitID;

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

const iconInfo = (habit: HabitDTO) =>
	habit.completed ? HABIT_NAME_ICONS.completed : HABIT_NAME_ICONS.inProgress;
</script>
<template>
	<button
		ref="item"
		class="h-full w-full rounded-2xl border"
		:title="habit.name"
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
			<div class="flex items-center justify-between text-start">
				{{ habit.name }}
				<Icon
					:icon="ICONS.arrowHeadRight"
					:class="[
						isExpanded(habit.id) ? 'rotate-90' : 'rotate-180',
						'transition-transform',
					]"
				/>
			</div>

			<div v-if="isExpanded(habit.id)" class="flex justify-between gap-4">
				<button
					v-if="habit.canToggleCompletion"
					id="toggle-completion"
					:title="
						habit.completed
							? 'Mark habit as incomplete'
							: 'Mark habit as complete'
					"
					:aria-label="
						habit.completed
							? 'Mark habit as incomplete'
							: 'Mark habit as complete'
					"
					class="transition-transform hover:scale-125 focus-visible:scale-125"
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
					:selected-date="date"
					@submit="(updatedHabit) => onEdit(habit.id, updatedHabit)"
				>
					<template #trigger="{ open }">
						<button
							title="Edit habit"
							aria-label="Edit habit"
							class="transition-transform hover:scale-125 focus-visible:scale-125"
							@click.stop="open"
						>
							<Icon :icon="ICONS.edit" class="text-2xl" />
						</button>
					</template>
				</AddHabitFormDrawer>

				<button
					v-if="habit.canToggleStatus"
					:title="
						habit.activeStatus === 'active'
							? 'Mark habit as inactive'
							: 'Mark habit as active'
					"
					:aria-label="
						habit.activeStatus === 'active'
							? 'Mark habit as inactive'
							: 'Mark habit as active'
					"
					class="transition-transform hover:scale-125 focus-visible:scale-125"
					@click.stop="onToggleStatus(habit.id)"
				>
					<Icon
						:icon="habit.activeStatus === 'active' ? ICONS.pause : ICONS.resume"
						class="text-3xl"
					/>
				</button>

				<button
					title="Delete habit"
					aria-label="Delete habit"
					class="transition-transform hover:scale-125 focus-visible:scale-125"
					@click.stop="onDelete(habit.id)"
				>
					<Icon :icon="ICONS.delete" class="text-2xl text-red-500" />
				</button>
			</div>
		</div>
	</button>
</template>
