<script setup lang="ts">
import { cn } from "@/lib/utils";
import {
	DialogDescription,
	type DialogDescriptionProps,
	useForwardProps,
} from "reka-ui";

const props = defineProps<DialogDescriptionProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
	<DialogDescription
		data-slot="dialog-description"
		v-bind="forwardedProps"
		:class="cn('text-muted-foreground text-sm')"
	>
		<slot />
	</DialogDescription>
</template>
