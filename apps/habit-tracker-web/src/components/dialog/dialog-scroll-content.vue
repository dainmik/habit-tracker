<script setup lang="ts">
import { cn } from "@/lib/utils";
import { X } from "lucide-vue-next";
import {
	DialogClose,
	DialogContent,
	type DialogContentEmits,
	type DialogContentProps,
	DialogOverlay,
	DialogPortal,
	useForwardPropsEmits,
} from "reka-ui";

const props = defineProps<DialogContentProps>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<DialogPortal>
		<DialogOverlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80"
		>
			<DialogContent
				:class="
					cn(
						'border-border bg-background relative z-50 my-8 grid w-full max-w-lg gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg md:w-full',
					)
				"
				v-bind="forwarded"
				@pointer-down-outside="
					(event) => {
						const originalEvent = event.detail.originalEvent;
						// Vue docs recommend to type-assert EventTarget, which is suboptimal
						// but will work for now
						// https://vuejs.org/guide/typescript/options-api#typing-event-handlers
						const target = originalEvent.target as HTMLElement | null;
						if (!target) return;

						if (
							originalEvent.offsetX > target.clientWidth ||
							originalEvent.offsetY > target.clientHeight
						) {
							event.preventDefault();
						}
					}
				"
			>
				<slot />

				<DialogClose
					class="hover:bg-secondary absolute top-4 right-4 rounded-md p-0.5 transition-colors"
				>
					<X class="h-4 w-4" />
					<span class="sr-only">Close</span>
				</DialogClose>
			</DialogContent>
		</DialogOverlay>
	</DialogPortal>
</template>
