<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
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
	formToHabitDTO,
	getEmptyHabitForm,
	habitToForm,
	type HabitForm,
} from "@/features/habit/add-habit-form/add-habit-form-mapper";
import type { DateType } from "@/lib/date";
import type { HabitInputModel } from "@/model/habit/habit-input-model";
import type { HabitViewModel } from "@/model/habit/habit-view-model";
import { reactive, watch } from "vue";

const props = defineProps<{
	habit?: HabitViewModel;
	selectedDate: DateType;
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

const emptyHabitForm = getEmptyHabitForm(props.selectedDate);
const form = reactive<HabitForm>(emptyHabitForm);

watch(
	() => props.habit,
	(newHabit) => {
		if (newHabit) {
			Object.assign(form, habitToForm(newHabit, props.selectedDate));
		} else {
			Object.assign(form, emptyHabitForm);
		}
	},
	{ immediate: true },
);

const handleSubmit = () => {
	const habitDTO: HabitInputModel = formToHabitDTO(form);
	emits("submit", habitDTO);
	console.log(habitDTO);
	resetForm();
};

function resetForm() {
	Object.assign(form, emptyHabitForm);
}
</script>

<template>
	<form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
		<!-- Name -->
		<div class="flex flex-col gap-1">
			<Label for="name">Name</Label>
			<Input id="name" v-model="form.name" name="name" />
		</div>

		<!-- Start Date -->
		<div class="flex flex-col gap-1">
			<Label for="start-date">Start date</Label>
			<DatePicker id="start-date" v-model="form.startDate" name="startDate" />
		</div>

		<!-- Repeat toggle -->
		<div class="flex flex-col gap-1">
			<Label for="repeat">Repeat</Label>
			<Switch id="repeat" v-model="form.repeatEnabled" name="repeat" />
		</div>

		<!-- Repeat Config -->
		<div
			v-if="form.repeatEnabled"
			class="card flex flex-col justify-center gap-4"
		>
			<div class="flex gap-4">
				<Label for="repeatEvery" class="flex items-center">Every</Label>
				<Input
					id="repeatEvery"
					v-model="form.repeatEvery"
					input-id="repeatEvery"
					type="number"
					name="repeatEvery"
				/>

				<Label for="repeatKind" class="sr-only">Repeat kind</Label>
				<Select
					v-model="form.repeatKind"
					aria-label="Repeat frequency"
					name="repeatKind"
				>
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
			<ToggleGroup
				v-if="form.repeatKind === 'week'"
				v-model="form.daysOfWeek"
				type="multiple"
				name="daysOfWeek"
				aria-label="Repeat on days of the week"
			>
				<ToggleGroupItem
					v-for="option in daysOfWeekOptions"
					:key="option.value"
					:value="option.value"
					variant="outline"
				>
					{{ option.name }}
				</ToggleGroupItem>
			</ToggleGroup>

			<!-- Duration Type -->
			<ToggleGroup
				v-model="form.durationType"
				name="durationType"
				aria-label="Repeat until condition"
			>
				<ToggleGroupItem
					v-for="option in durationOptions"
					:key="option.value"
					:value="option.value"
					variant="outline"
				>
					{{ option.name }}
				</ToggleGroupItem>
			</ToggleGroup>

			<!-- Duration: Count -->
			<div v-if="form.durationType === 'afterOccurrences'">
				<Input
					v-model="form.occurrenceCount"
					input-id="occurrenceCount"
					name="occurrenceCount"
					aria-label="Repeat until times completed"
				/>
			</div>

			<!-- Duration: Until Date -->
			<div
				v-else-if="form.durationType === 'untilDate'"
				class="flex flex-col gap-1"
			>
				<Label for="end-date">End date</Label>

				<DatePicker
					id="end-date"
					v-model="form.untilDate"
					name="endDate"
					aria-label="Repeat until date"
				/>
			</div>
		</div>

		<!-- A display: none, disabled submit input prevents implicit submission of the form when user presses enter while not focused on the submit button. -->
		<input type="submit" disabled class="hidden" aria-hidden="true" />
		<Button type="submit">OK</Button>
	</form>
</template>
