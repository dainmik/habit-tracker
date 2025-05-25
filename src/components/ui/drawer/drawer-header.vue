<script lang="ts" setup>
import { cn } from "@/lib/utils";
</script>

<template>
	<div data-slot="drawer-header" :class="cn('flex flex-col gap-1.5 p-4')">
		<slot />
	</div>
</template>
