export class LocalStorage<T> {
	key: string;
	defaultValue: T;

	constructor(key: string, defaultValue: T) {
		this.key = key;
		this.defaultValue = defaultValue;
	}

	get() {
		const json = localStorage.getItem(this.key);
		const data = JSON.parse(json ?? "null") as T | null;
		return data ?? this.defaultValue;
	}

	set(item: T) {
		localStorage.setItem(this.key, JSON.stringify(item));
	}
}
