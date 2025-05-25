<script setup lang="ts">
import { cn } from "@/lib/utils";
import { DialogOverlay, type DialogOverlayProps } from "reka-ui";

const props = defineProps<DialogOverlayProps>();
</script>

<template>
	<DialogOverlay
		data-slot="dialog-overlay"
		v-bind="props"
		:class="
			cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
			)
		"
	>
		<slot />
	</DialogOverlay>
</template>
