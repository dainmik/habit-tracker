<script setup lang="ts">
import { APP_CONFIG } from "@/app/config";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useTitle } from "@vueuse/core";
import { RouterLink, RouterView } from "vue-router";

useTitle(APP_CONFIG.name);
</script>

<template>
	<header>
		<nav class="flex items-center justify-between gap-2">
			<RouterLink class="font-bold uppercase" to="/">{{
				APP_CONFIG.name
			}}</RouterLink>
			<ThemeSwitcher />
		</nav>
	</header>

	<main class="flex h-full flex-1 flex-col gap-6">
		<RouterView />
	</main>
</template>
