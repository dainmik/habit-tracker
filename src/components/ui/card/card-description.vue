<script setup lang="ts">
import { cn } from "@/lib/utils";
</script>

<template>
	<p data-slot="card-description" :class="cn('text-muted-foreground text-sm')">
		<slot />
	</p>
</template>
