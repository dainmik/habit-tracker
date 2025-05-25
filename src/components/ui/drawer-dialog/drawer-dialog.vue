<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@vueuse/core";
import { ref } from "vue";

defineProps<{
	headerLabel?: string;
	description?: string;
}>();

const isDesktop = useMediaQuery("(min-width: 768px)");
const isOpen = ref(false);

function open() {
	isOpen.value = true;
}
function close() {
	isOpen.value = false;
}
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
				<DrawerFooter class="pt-4">
					<DrawerClose as-child>
						<Button variant="outline" type="button">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</div>
		</DrawerContent>
	</Drawer>
</template>
