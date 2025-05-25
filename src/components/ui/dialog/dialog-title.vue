<script setup lang="ts">
import { cn } from "@/lib/utils";
import { DialogTitle, type DialogTitleProps, useForwardProps } from "reka-ui";

const props = defineProps<DialogTitleProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
	<DialogTitle
		data-slot="dialog-title"
		v-bind="forwardedProps"
		:class="cn('text-lg leading-none font-semibold')"
	>
		<slot />
	</DialogTitle>
</template>
