<script lang="ts" setup>
import { useForwardPropsEmits } from "reka-ui";
import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue";
import { DrawerRoot } from "vaul-vue";

// Not sure why TypeScript infers props as never here.
const props: DrawerRootProps = withDefaults(defineProps<DrawerRootProps>(), {
	shouldScaleBackground: true,
});

const emits = defineEmits<DrawerRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<DrawerRoot data-slot="drawer" v-bind="forwarded">
		<slot />
	</DrawerRoot>
</template>
