<script setup lang="ts">
import { cn } from "@/lib/utils";
</script>

<template>
	<span
		data-slot="dropdown-menu-shortcut"
		:class="cn('text-muted-foreground ml-auto text-xs tracking-widest')"
	>
		<slot />
	</span>
</template>
