<script setup lang="ts">
import { format, getDate, parseISO } from "date-fns";
import { computed } from "vue";

const props = defineProps<{
	iso: string;
	isActive: boolean;
}>();
const emits = defineEmits<{
	(e: "pressed", iso: string): void;
}>();

const date = computed(() => parseISO(props.iso));
const weekday = computed(() => format(date.value, "EEE"));
const day = computed(() => getDate(date.value));
</script>

<template>
	<RouterLink
		class="min-w-[3rem] rounded-sm border p-2 text-center"
		:class="{
			'bg-red-500': props.isActive,
		}"
		@click="emits('pressed', iso)"
		:to="`/day/${iso}`"
	>
		<div>{{ weekday }}</div>
		<div>{{ day }}</div>
	</RouterLink>
</template>
