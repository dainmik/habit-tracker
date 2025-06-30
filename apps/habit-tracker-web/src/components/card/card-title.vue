<script setup lang="ts">
import { cn } from "@/lib/utils";
</script>

<template>
	<h3 data-slot="card-title" :class="cn('leading-none font-semibold')">
		<slot />
	</h3>
</template>
