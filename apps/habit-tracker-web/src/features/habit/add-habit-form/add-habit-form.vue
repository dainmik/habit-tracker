<script setup lang="ts">
import { Button } from "@/components/button";
import { DatePicker } from "@/components/date-picker";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import Label from "@/components/label/label.vue";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectItemText,
	SelectTrigger,
	SelectValue,
} from "@/components/select";
import Switch from "@/components/switch/switch.vue";
import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group";
import type { DateType } from "@repo/date";
import { addMonths } from "@repo/date";
import {
	DayRepeatInputSchema,
	HabitInputSchema,
	MAX_HABIT_NUMBER_INPUT_VALUE,
	type HabitInputModel,
} from "@repo/habit-tracker-data/model";
import { toTypedSchema } from "@vee-validate/zod";
import { useField, useForm } from "vee-validate";
import { ref, watch } from "vue";

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

const props = defineProps<{
	habit: HabitInputModel | null;
	selectedDate: DateType;
}>();

const emits = defineEmits<{
	submit: [habit: HabitInputModel];
}>();

const { handleSubmit, resetForm, values, setFieldValue, setValues } = useForm({
	validationSchema: toTypedSchema(HabitInputSchema),
	keepValuesOnUnmount: true,
});

const repeatEnabledValue = ref(!!props.habit?.schedule.repeat);
const handleToggleRepeatEnabled = (value: boolean) => {
	if (!value || values.schedule?.repeat) return;

	setFieldValue(
		"schedule.repeat",
		DayRepeatInputSchema.parse({
			type: "day",
			duration: { type: "forever" },
			everyNumberOfDays: 1,
		}),
	);
};

const repeatCount = ref(1);
watch(repeatCount, (newRepeatCount) => {
	setEveryNumberOfDaysValue(newRepeatCount);
	setEveryNumberOfWeeksValue(newRepeatCount);
});

const onSubmit = (event: Event) => {
	/**
	 * The form has options to conditionally show some fields.
	 * When a show condition is toggled on, the states of the fields
	 * are populated with default values and the user can modify those values.
	 * When the show condition is toggled off, we want to retain
	 * the data that the user entered in those fields that
	 * were previously shown and now are hidden. This is good UX in case
	 * the user toggled off the fields by mistake or changed their mind.
	 *
	 * Since our form maps directly to a Zod schema, the hidden fields
	 * (and their preserved values) are still present in the form data
	 * during submission. As a result, Zod attempts to validate them,
	 * even though they are no longer relevant, which leads to unintended
	 * validation errors.
	 *
	 * Therefore, we manually check the toggled state of those options
	 * and if the user has toggled them off, we remove them from the form
	 * before sending the data to Zod for validation.
	 *
	 * The toggle state could be defined as part of the Zod schema, but the schema
	 * is defined in the back-end and reused for front-end and back-end validation.
	 * This toggle state is a concern of the front-end, and as such would be
	 * inappropriate to be placed inside the back-end application layer.
	 */
	if (!repeatEnabledValue.value) {
		setFieldValue("schedule.repeat", null);
	}

	void handleSubmit((values) => {
		resetForm();
		emits("submit", values);
	})(event);
};

const { value: nameValue, name: nameName } = useField<string>("name");

const { value: startDateValue, name: startDateName } = useField<DateType>(
	"schedule.startDate",
	undefined,
	{ initialValue: props.selectedDate },
);

const { value: repeatTypeValue, name: repeatTypeName } = useField<
	"day" | "week"
>("schedule.repeat.type", undefined, { initialValue: "day" });

const { name: everyNumberOfDaysName, setValue: setEveryNumberOfDaysValue } =
	useField("schedule.repeat.everyNumberOfDays", undefined, { initialValue: 1 });

const { name: everyNumberOfWeeksName, setValue: setEveryNumberOfWeeksValue } =
	useField("schedule.repeat.everyNumberOfWeeks", undefined, {
		initialValue: 1,
	});

const { value: daysOfWeekValue, name: daysOfWeekName } = useField(
	"schedule.repeat.daysOfWeek",
	{},
	{
		initialValue: [],
	},
);

const { value: durationTypeValue, name: durationTypeName } = useField(
	"schedule.repeat.duration.type",
	undefined,
	{ initialValue: "forever" },
);

const { value: afterOccurrencesValue, name: afterOccurrencesName } = useField(
	"schedule.repeat.duration.afterOccurrences",
	undefined,
	{ initialValue: 10 },
);

const { value: endDateValue, name: endDateName } = useField<DateType>(
	"schedule.repeat.duration.endDate",
	undefined,
	{ initialValue: addMonths(props.selectedDate, 1) },
);

watch(
	/**
	 * We run the watch callback after the form fields are mapped with initial values with `useField`,
	 * because otherwise `initialValue` declarations in `useField` calls overwrite the values set by the watcher.
	 */
	() => props.habit,
	(newHabit) => {
		if (newHabit) {
			setValues(newHabit);

			if (newHabit.schedule.repeat) {
				repeatCount.value =
					newHabit.schedule.repeat.type === "day"
						? newHabit.schedule.repeat.everyNumberOfDays
						: newHabit.schedule.repeat.everyNumberOfWeeks;
			}
		} else {
			resetForm();
		}
	},
	{
		immediate: true,
	},
);
</script>

<template>
	<form class="flex flex-col gap-4" novalidate @submit.prevent="onSubmit">
		<!-- Name -->
		<div class="flex flex-col gap-1">
			<FormField :name="nameName">
				<FormItem>
					<FormLabel for="name">Name</FormLabel>
					<FormControl>
						<Input v-model="nameValue" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>

		<!-- Start Date -->
		<div class="flex flex-col gap-1">
			<FormField :name="startDateName">
				<FormItem>
					<FormLabel for="start-date">Start date</FormLabel>
					<FormControl>
						<DatePicker id="start-date" v-model="startDateValue" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>

		<!-- Repeat toggle -->
		<div class="flex flex-col gap-1">
			<FormField name="repeatEnabled">
				<FormItem>
					<Label for="repeatEnabled">Repeat</Label>
					<FormControl>
						<Switch
							id="repeatEnabled"
							v-model="repeatEnabledValue"
							name="repeatEnabled"
							@update:model-value="handleToggleRepeatEnabled"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
		</div>

		<!-- Repeat Config -->
		<div
			v-if="repeatEnabledValue"
			class="card flex flex-col justify-center gap-4"
		>
			<div class="flex gap-4">
				<FormField
					v-if="values.schedule?.repeat?.type === 'day'"
					:name="everyNumberOfDaysName"
				>
					<FormItem>
						<FormLabel for="repeatEvery" class="flex items-center"
							>Every</FormLabel
						>
						<FormControl>
							<Input
								id="repeatEvery"
								v-model="repeatCount"
								input-id="repeatEvery"
								type="number"
								name="repeatEvery"
								:min="1"
								:max="MAX_HABIT_NUMBER_INPUT_VALUE"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<FormField v-else :name="everyNumberOfWeeksName">
					<FormItem>
						<FormLabel for="repeatEvery" class="flex items-center"
							>Every</FormLabel
						>
						<FormControl>
							<Input
								id="repeatEvery"
								v-model="repeatCount"
								input-id="repeatEvery"
								type="number"
								name="repeatEvery"
								:min="1"
								:max="MAX_HABIT_NUMBER_INPUT_VALUE"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>

				<FormField :name="repeatTypeName">
					<FormItem>
						<FormLabel for="repeatKind" class="sr-only">Repeat kind</FormLabel>
						<FormControl>
							<Select
								v-model="repeatTypeValue"
								aria-label="Repeat frequency"
								name="repeatKind"
							>
								<SelectTrigger id="repeatKind">
									<SelectValue :value="values.schedule?.repeat?.type" />
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
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>

			<!-- Weekdays -->
			<FormField :name="daysOfWeekName">
				<FormItem>
					<FormLabel for="daysOfWeek">Days of week</FormLabel>
					<FormControl>
						<ToggleGroup
							v-if="values.schedule?.repeat?.type === 'week'"
							v-model="daysOfWeekValue"
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
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<!-- Duration Type -->
			<FormField :name="durationTypeName">
				<FormItem>
					<FormLabel for="durationType">Duration type</FormLabel>
					<FormControl>
						<ToggleGroup
							v-model="durationTypeValue"
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
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<!-- Duration: Count -->
			<div
				v-if="values.schedule?.repeat?.duration?.type === 'afterOccurrences'"
			>
				<FormField :name="afterOccurrencesName">
					<FormItem>
						<FormLabel for="occurrenceCount">Occurrence count</FormLabel>
						<FormControl>
							<Input
								v-model="afterOccurrencesValue"
								type="number"
								input-id="occurrenceCount"
								name="occurrenceCount"
								aria-label="Repeat until times completed"
								:min="1"
								:max="MAX_HABIT_NUMBER_INPUT_VALUE"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>

			<!-- Duration: Until Date -->
			<div
				v-else-if="values.schedule?.repeat?.duration?.type === 'untilDate'"
				class="flex flex-col gap-1"
			>
				<FormField :name="endDateName">
					<FormItem>
						<FormLabel for="end-date">End date</FormLabel>
						<FormControl>
							<DatePicker
								id="end-date"
								v-model="endDateValue"
								name="endDate"
								aria-label="Repeat until date"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
		</div>

		<Button type="submit">Save changes</Button>
	</form>
</template>
