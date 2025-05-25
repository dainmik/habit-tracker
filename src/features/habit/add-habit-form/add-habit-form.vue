<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input/input.vue";
import Label from "@/components/ui/label/label.vue";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectItemText,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Switch from "@/components/ui/switch/switch.vue";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	emptyHabitForm,
	formToHabitDTO,
	habitToForm,
	type HabitForm,
} from "@/features/habit/add-habit-form/add-habit-form-mapper";
import type { HabitInputModel } from "@/model/habit/habit-input-model";
import type { HabitViewModel } from "@/model/habit/habit-view-model";
import { reactive, watch } from "vue";

const props = defineProps<{
	habit?: HabitViewModel;
}>();

const emits = defineEmits<{
	submit: [habit: HabitInputModel];
}>();

const repeatOptions = [
	{ name: "day(s)", value: "day" },
	{ name: "week(s)", value: "week" },
];

const daysOfWeekOptions = [
	{ name: "M", value: "monday" },
	{ name: "T", value: "tuesday" },
	{ name: "W", value: "wednesday" },
	{ name: "T", value: "thursday" },
	{ name: "F", value: "friday" },
	{ name: "S", value: "saturday" },
	{ name: "S", value: "sunday" },
];

const durationOptions = [
	{ name: "Forever", value: "forever" },
	{ name: "Until", value: "untilDate" },
	{ name: "After occurrences", value: "afterOccurrences" },
];

// Initialize form state
const form = reactive<HabitForm>(emptyHabitForm());

// Watch for habit prop changes
watch(
	() => props.habit,
	(newHabit) => {
		if (newHabit) {
			Object.assign(form, habitToForm(newHabit));
		} else {
			Object.assign(form, emptyHabitForm());
		}
	},
	{ immediate: true },
);

const handleSubmit = () => {
	const habitDTO: HabitInputModel = formToHabitDTO(form);
	emits("submit", habitDTO);
	resetForm();
};

function resetForm() {
	Object.assign(form, emptyHabitForm());
}
</script>

<template>
	<div class="flex flex-col gap-4">
		<!-- Name -->
		<div class="flex flex-col gap-1">
			<Label for="name">Name</Label>
			<Input id="name" v-model="form.name" />
		</div>

		<!-- Start Date -->
		<div class="flex flex-col gap-1">
			<Label for="start-date">Start date</Label>
			<input id="start-date" v-model="form.startDate" type="date" />
		</div>

		<!-- Repeat toggle -->
		<div class="flex flex-col gap-1">
			<Label for="repeat">Repeat</Label>
			<Switch id="repeat" v-model="form.repeatEnabled" />
		</div>

		<!-- Repeat Config -->
		<div v-if="form.repeatEnabled" class="card flex flex-col justify-center">
			<div class="flex gap-4">
				<Label for="repeatEvery" class="flex items-center">Every</Label>
				<Input
					id="repeatEvery"
					v-model="form.repeatEvery"
					input-id="repeatEvery"
					type="number"
				/>

				<Label for="repeatKind" class="sr-only">Repeat kind</Label>
				<Select v-model="form.repeatKind" aria-label="Repeat frequency">
					<SelectTrigger id="repeatKind">
						<SelectValue :value="form.repeatKind" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem
							v-for="option in repeatOptions"
							:key="option.value"
							:value="option.value"
						>
							<SelectItemText>
								{{ option.name }}
							</SelectItemText>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<!-- Weekdays -->
			<div v-if="form.repeatKind === 'week'" class="card flex justify-center">
				<ToggleGroup
					v-if="form.repeatKind === 'week'"
					v-model="form.daysOfWeek"
					type="multiple"
				>
					<ToggleGroupItem
						v-for="option in daysOfWeekOptions"
						:key="option.value"
						:value="option.value"
						aria-label="Toggle bold"
					>
						{{ option.name }}
					</ToggleGroupItem>
				</ToggleGroup>
			</div>

			<!-- Duration Type -->
			<div class="card flex justify-center">
				<ToggleGroup v-model="form.durationType">
					<ToggleGroupItem
						v-for="option in durationOptions"
						:key="option.value"
						:value="option.value"
						aria-label="Toggle bold"
					>
						{{ option.name }}
					</ToggleGroupItem>
				</ToggleGroup>
			</div>

			<!-- Duration: Count -->
			<div v-if="form.durationType === 'afterOccurrences'">
				<Input v-model="form.occurrenceCount" input-id="occurrenceCount" />
			</div>

			<!-- Duration: Until Date -->
			<div
				v-else-if="form.durationType === 'untilDate'"
				class="flex flex-col gap-1"
			>
				<Label for="end-date">End date</Label>
				<input id="end-date" v-model="form.untilDate" type="date" />
			</div>
		</div>

		<Button @click="handleSubmit">OK</Button>
	</div>
</template>
