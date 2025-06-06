<script setup lang="ts">
import { RovingFocusItem } from "reka-ui";

const props = defineProps<{
	focusedInitially?: boolean;
}>();
</script>

<template>
	<RovingFocusItem as-child :active="props.focusedInitially">
		<slot />
	</RovingFocusItem>
</template>
