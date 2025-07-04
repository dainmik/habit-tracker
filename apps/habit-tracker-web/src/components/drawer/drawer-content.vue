<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { DialogContentEmits, DialogContentProps } from "reka-ui";
import { useForwardPropsEmits } from "reka-ui";
import { DrawerContent, DrawerPortal } from "vaul-vue";
import DrawerOverlay from "./drawer-overlay.vue";

const props = defineProps<DialogContentProps>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<DrawerPortal>
		<DrawerOverlay />
		<DrawerContent
			data-slot="drawer-content"
			v-bind="forwarded"
			:class="
				cn(
					`overflow-x-auto`,
					`group/drawer-content bg-background fixed z-50 flex h-auto flex-col`,
					`data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg`,
					`data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg`,
					`data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm`,
					`data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm`,
				)
			"
		>
			<div
				class="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block"
			/>
			<slot />
		</DrawerContent>
	</DrawerPortal>
</template>
<style scoped>
/* https://github.com/emilkowalski/vaul/issues/575 */
[data-vaul-drawer][data-vaul-drawer-direction="bottom"]::after {
	height: unset;
}
</style>
