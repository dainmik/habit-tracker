<script setup lang="ts">
import { cn } from "@/lib/utils";
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from "reka-ui";

defineOptions({
	inheritAttrs: false,
});

const props = defineProps<{
	id?: string;
	modelValue?: boolean;
}>();
const emits = defineEmits<{
	"update:modelValue": [payload: boolean];
}>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<SwitchRoot
		data-slot="switch"
		v-bind="forwarded"
		:class="
			cn(
				'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50',
			)
		"
	>
		<SwitchThumb
			data-slot="switch-thumb"
			:class="
				cn(
					'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
				)
			"
		>
			<slot name="thumb" />
		</SwitchThumb>
	</SwitchRoot>
</template>
