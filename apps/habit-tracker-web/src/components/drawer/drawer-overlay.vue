<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { DialogOverlayProps } from "reka-ui";
import { DrawerOverlay } from "vaul-vue";

const props = defineProps<DialogOverlayProps>();
</script>

<template>
	<DrawerOverlay
		data-slot="drawer-overlay"
		v-bind="props"
		:class="
			cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80',
			)
		"
	/>
</template>
