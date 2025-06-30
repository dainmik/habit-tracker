<script setup lang="ts">
import { APP_CONFIG } from "@/app/config";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useTitle } from "@vueuse/core";
import { RouterLink, RouterView } from "vue-router";

useTitle(APP_CONFIG.name);
</script>

<template>
	<header>
		<nav class="flex items-center justify-between gap-2">
			<RouterLink
				class="-ml-2 rounded-md p-2 font-bold uppercase transition-transform hover:scale-105 focus:scale-105"
				to="/"
				>{{ APP_CONFIG.name }}</RouterLink
			>
			<ThemeSwitcher />
		</nav>
	</header>

	<main class="flex h-full min-h-0 flex-col gap-6">
		<RouterView />
	</main>
</template>
