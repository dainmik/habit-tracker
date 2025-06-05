<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { TabsRootEmits, TabsRootProps } from "reka-ui";
import { TabsRoot, useForwardPropsEmits } from "reka-ui";

const props = defineProps<TabsRootProps>();
const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<TabsRoot
		data-slot="tabs"
		v-bind="forwarded"
		:class="cn('flex flex-col gap-2')"
	>
		<slot />
	</TabsRoot>
</template>
