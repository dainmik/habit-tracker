<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
	DropdownMenuSeparator,
	type DropdownMenuSeparatorProps,
} from "reka-ui";

const props = defineProps<DropdownMenuSeparatorProps>();
</script>

<template>
	<DropdownMenuSeparator
		data-slot="dropdown-menu-separator"
		v-bind="props"
		:class="cn('bg-border -mx-1 my-1 h-px')"
	/>
</template>
