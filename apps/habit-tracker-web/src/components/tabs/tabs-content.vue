<script setup lang="ts">
import { cn } from "@/lib/utils";
import { TabsContent, type TabsContentProps } from "reka-ui";

const props = defineProps<TabsContentProps>();
</script>

<template>
	<TabsContent
		data-slot="tabs-content"
		:class="cn('flex-1 outline-none')"
		v-bind="props"
	>
		<slot />
	</TabsContent>
</template>
