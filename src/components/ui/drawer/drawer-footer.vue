<script lang="ts" setup>
import { cn } from "@/lib/utils";
</script>

<template>
	<div data-slot="drawer-footer" :class="cn('mt-auto flex flex-col gap-2 p-4')">
		<slot />
	</div>
</template>
