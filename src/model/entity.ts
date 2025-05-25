export abstract class Entity {
	id: string;

	constructor() {
		this.id = crypto.randomUUID();
	}
}
