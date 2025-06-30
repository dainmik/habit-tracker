<script lang="ts" setup>
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/drawer";
import { useMediaQuery } from "@vueuse/core";
import { ref } from "vue";

defineProps<{
	headerLabel?: string;
	description?: string;
}>();

const isDesktop = useMediaQuery("(min-width: 768px)");
const isOpen = ref(false);

const open = () => {
	isOpen.value = true;
};
const close = () => {
	isOpen.value = false;
};
</script>

<template>
	<!-- Trigger Slot -->
	<slot name="trigger" :open="open" />

	<!-- Dialog for Desktop -->
	<Dialog v-if="isDesktop" v-model:open="isOpen">
		<DialogContent class="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>{{ headerLabel }}</DialogTitle>
				<DialogDescription v-if="description">
					{{ description }}
				</DialogDescription>
			</DialogHeader>

			<div>
				<slot :close="close" />
			</div>
		</DialogContent>
	</Dialog>

	<!-- Drawer for Mobile -->
	<Drawer v-else v-model:open="isOpen">
		<DrawerContent>
			<DrawerHeader class="text-left">
				<DrawerTitle>{{ headerLabel }}</DrawerTitle>
				<DrawerDescription v-if="description">
					{{ description }}
				</DrawerDescription>
			</DrawerHeader>

			<div class="px-4">
				<slot :close="close" />
			</div>

			<DrawerFooter class="pt-4"> </DrawerFooter>
		</DrawerContent>
	</Drawer>
</template>
