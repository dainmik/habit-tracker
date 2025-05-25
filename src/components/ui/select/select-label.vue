<script setup lang="ts">
import { cn } from "@/lib/utils";
import { SelectLabel } from "reka-ui";
</script>

<template>
	<SelectLabel
		data-slot="select-label"
		:class="cn('px-2 py-1.5 text-sm font-medium')"
	>
		<slot />
	</SelectLabel>
</template>
