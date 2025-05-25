<script setup lang="ts">
import { cn } from "@/lib/utils";
import { SelectSeparator, type SelectSeparatorProps } from "reka-ui";

const props = defineProps<SelectSeparatorProps>();
</script>

<template>
	<SelectSeparator
		data-slot="select-separator"
		v-bind="props"
		:class="cn('bg-border pointer-events-none -mx-1 my-1 h-px')"
	/>
</template>
