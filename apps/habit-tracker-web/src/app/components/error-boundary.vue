<script setup lang="ts">
import { computed, onErrorCaptured, ref } from "vue";

const { propagate } = defineProps<{
	propagate?: boolean;
}>();

const error = ref();

const clearError = () => {
	error.value = null;
};

const slotProps = computed(() => {
	if (!error.value) return {};

	return { error, clearError };
});

onErrorCaptured((err) => {
	error.value = err;

	if (propagate) {
		// Returning false prevents the error from propagating further.
		// See: https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured
		return false;
	}
});
</script>

<template>
	<slot v-if="error" name="error" v-bind="slotProps"></slot>
	<slot v-else name="default"></slot>
</template>
