<script setup lang="ts">
const props = defineProps<{
	weekday: string;
	day: number;
}>();
</script>

<template>
	<div class="min-w-[3rem] rounded-sm border p-2 text-center">
		<div>{{ props.weekday }}</div>
		<div>{{ props.day }}</div>
	</div>
</template>
