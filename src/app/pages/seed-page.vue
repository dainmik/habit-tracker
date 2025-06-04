<script setup lang="ts">
import { seedHabits } from "@/app/seed-habits";
import { type DateType } from "@/lib/date";

const props = defineProps<{
	date: DateType;
}>();

seedHabits(props.date);
</script>

<template>Seeded</template>
