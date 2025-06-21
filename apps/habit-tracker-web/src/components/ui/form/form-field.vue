<script setup lang="ts" generic="T">
import { FORM_FIELD_INJECTION_KEY } from "@/components/ui/form/injection-keys";
import { cn } from "@/lib/utils";
import { useField, type FieldOptions } from "vee-validate";
import { provide, type HTMLAttributes } from "vue";

const props = withDefaults(
	defineProps<{
		name: string;
		// This type argument is necessary for type inference to work. It can't be omitted.
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
		options?: Partial<FieldOptions<T>>;
		class?: HTMLAttributes["class"];
	}>(),
	{
		options: () => ({}),
		class: undefined,
	},
);

const field = useField(props.name, undefined, {
	keepValueOnUnmount: true,
	...props.options,
});

provide(FORM_FIELD_INJECTION_KEY, { name: props.name });
</script>

<template>
	<div data-slot="form-item" :class="cn('grid gap-2', props.class)">
		<slot v-bind="field" />
	</div>
</template>
