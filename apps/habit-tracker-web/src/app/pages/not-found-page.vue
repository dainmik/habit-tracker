<script setup lang="ts">
import { Button } from "@/components/button";
import { RouterLink } from "vue-router";
</script>

<template>
	<div
		data-testid="page-not-found"
		class="flex h-full flex-col items-center justify-center gap-4"
	>
		<p>The requested page does not exist.</p>
		<Button as-child
			><RouterLink to="/">See today's habits!</RouterLink></Button
		>
	</div>
</template>
