<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<header>
		<div class="wrapper">
			<nav class="flex gap-2">
				<RouterLink to="/">Home</RouterLink>
			</nav>
		</div>
	</header>

	<main>
		<RouterView />
	</main>
</template>
