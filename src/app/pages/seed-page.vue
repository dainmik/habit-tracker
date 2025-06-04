<script setup lang="ts">
import { seedHabits } from "@/app/seed-habits";
import { type DateType } from "@/lib/date";
import { ref, watchEffect } from "vue";

const props = defineProps<{
	date: DateType;
}>();

const selectedDay = ref(props.date);
watchEffect(() => {
	selectedDay.value = props.date;
});

seedHabits();
</script>

<template>Seeded</template>
