<script setup lang="ts">
import { cn } from "@/lib/utils";
import { TabsList, type TabsListProps } from "reka-ui";

const props = defineProps<TabsListProps>();
</script>

<template>
	<TabsList
		data-slot="tabs-list"
		v-bind="props"
		:class="
			cn(
				'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
			)
		"
	>
		<slot />
	</TabsList>
</template>
