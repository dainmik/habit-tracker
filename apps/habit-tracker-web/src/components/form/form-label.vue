<script lang="ts" setup>
import { Label } from "@/components/label";
import { cn } from "@/lib/utils";
import type { LabelProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { useFormField } from "./use-form-field";

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const { error, formItemId } = useFormField();
</script>

<template>
	<Label
		data-slot="form-label"
		:data-error="!!error"
		:class="cn('data-[error=true]:text-destructive-foreground', props.class)"
		:for="formItemId"
	>
		<slot />
	</Label>
</template>
