<script lang="ts" setup>
import { useForwardPropsEmits } from "reka-ui";
import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue";
import { DrawerRoot } from "vaul-vue";

const props = withDefaults(defineProps<DrawerRootProps>(), {
	shouldScaleBackground: true,
});

const emits = defineEmits<DrawerRootEmits>();

// 'as object' cast fixes 'Spread types may only be created from object types.ts-plugin(2698)' error in the template 'v-bind="forwarded"'
const forwarded = useForwardPropsEmits(props, emits) as object;
</script>

<template>
	<DrawerRoot data-slot="drawer" v-bind="forwarded">
		<slot />
	</DrawerRoot>
</template>
