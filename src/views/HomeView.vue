<script setup lang="ts">
import DaySelect from "@/components/day-select/day-select.vue";
import HabbitList from "@/components/habbit-list/habbit-list.vue";
import { ref } from "vue";

const currentISO = ref("");
</script>

<template>
	<div class="flex h-full flex-col">
		<DaySelect
			@date-selected="
				(iso) => {
					currentISO = iso;
				}
			"
		/>
		<div class="flex grow flex-col justify-between">
			<div>Streak info</div>
			<HabbitList :iso="currentISO" />
		</div>
		<div>Add habbit</div>
	</div>
</template>
