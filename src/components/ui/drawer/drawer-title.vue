<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { DrawerTitleProps } from "vaul-vue";
import { DrawerTitle } from "vaul-vue";

const props = defineProps<DrawerTitleProps>();
</script>

<template>
	<DrawerTitle
		data-slot="drawer-title"
		v-bind="props"
		:class="cn('text-foreground font-semibold')"
	>
		<slot />
	</DrawerTitle>
</template>
