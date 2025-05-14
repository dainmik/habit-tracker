<script setup lang="ts">
import DayNavigation from "@/components/day-navigation.vue";
import HabbitList from "@/components/habbit-list/habbit-list.vue";
</script>

<template>
	<div class="flex flex-col">
		<DayNavigation />
		<div>Streak info</div>
		<HabbitList />
		<div>Add habbit</div>
	</div>
</template>
