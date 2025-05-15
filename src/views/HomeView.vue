<script setup lang="ts">
import DaySelect from "@/components/day-select/day-select.vue";
import HabbitList from "@/components/habbit-list/habbit-list.vue";
import { ref } from "vue";
</script>

<template>
	<div class="flex h-full flex-col">
		<DaySelect />
		<div class="flex grow flex-col justify-between">
			<div>Streak info</div>
			<HabbitList />
		</div>
		<div>Add habbit</div>
	</div>
</template>
