<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { RouterLink } from "vue-router";
</script>

<template>
	<div class="flex h-full flex-col items-center justify-center gap-4">
		<p>The requested page does not exist.</p>
		<Button as-child
			><RouterLink to="/">See today's habits!</RouterLink></Button
		>
	</div>
</template>
