<script setup lang="ts">
import { Button } from "@/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { ICONS } from "@/lib/icons";
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";

const mode = useColorMode();
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline" title="Toggle color theme">
				<Icon
					:icon="ICONS.moon"
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
				/>
				<Icon
					:icon="ICONS.sun"
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem @click="mode = 'light'"> Light </DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'dark'"> Dark </DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'auto'"> System </DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
