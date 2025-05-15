<script setup lang="ts">
const props = defineProps<{
	title: string;
	isCompleted: boolean;
}>();
</script>
<template>
	<li class="rounded-sm border p-2">
		<div>{{ props.title }}</div>
		<div>{{ props.isCompleted }}</div>
	</li>
</template>
