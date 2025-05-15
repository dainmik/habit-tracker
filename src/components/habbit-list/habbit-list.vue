<script setup lang="ts">
import { ref } from "vue";
import HabbitListItem from "./habbit-list-item.vue";

interface Habbit {
	id: number;
	title: string;
	isCompleted: boolean;
}

const habbits = ref<Habbit[]>([
	{
		id: 0,
		title: "Go for a run",
		isCompleted: false,
	},
	{
		id: 1,
		title: "Lift weights",
		isCompleted: true,
	},
]);
</script>
<template>
	<div v-if="habbits.length === 0">No habbits for today!</div>
	<ul v-else class="flex flex-col gap-2">
		<HabbitListItem
			v-for="habbit of habbits"
			:key="habbit.id"
			:title="habbit.title"
			:is-completed="habbit.isCompleted"
		/>
	</ul>
</template>
