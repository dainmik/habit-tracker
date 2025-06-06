import { onBeforeUnmount, onMounted, ref } from "vue";

interface BroadcastMessage<T = unknown> {
	type: string;
	payload?: T;
}

export const useBroadcastSync = <T = unknown>(channelName: string) => {
	const channel = new BroadcastChannel(channelName);
	const listeners = ref<((msg: BroadcastMessage<T>) => void)[]>([]);

	const postMessage = (msg: BroadcastMessage<T>) => {
		channel.postMessage(msg);
	};

	const onMessage = (event: MessageEvent<BroadcastMessage<T>>) => {
		listeners.value.forEach((listener) => {
			listener(event.data);
		});
	};

	const subscribe = (listener: (msg: BroadcastMessage<T>) => void) => {
		listeners.value.push(listener);
		return () => {
			listeners.value = listeners.value.filter((l) => l !== listener);
		};
	};

	onMounted(() => {
		channel.addEventListener("message", onMessage);
	});

	onBeforeUnmount(() => {
		channel.removeEventListener("message", onMessage);
		channel.close();
	});

	return {
		postMessage,
		subscribe,
	};
};
