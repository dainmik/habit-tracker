<script setup lang="ts">
import { cn } from "@/lib/utils";
</script>

<template>
	<div
		data-slot="dialog-footer"
		:class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end')"
	>
		<slot />
	</div>
</template>
