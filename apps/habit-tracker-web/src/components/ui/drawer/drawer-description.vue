<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { DrawerDescriptionProps } from "vaul-vue";
import { DrawerDescription } from "vaul-vue";

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
	<DrawerDescription
		data-slot="drawer-description"
		v-bind="props"
		:class="cn('text-muted-foreground text-sm')"
	>
		<slot />
	</DrawerDescription>
</template>
