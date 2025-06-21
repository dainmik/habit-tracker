export type ID = string;

export const generateID = () => crypto.randomUUID();

export abstract class Entity {
	id: ID;

	constructor(id?: ID) {
		this.id = id ?? generateID();
	}

	equals(other?: Entity) {
		if (other == null) return false;
		if (this === other) return true;
		if (this.constructor !== other.constructor) return false;
		return this.id === other.id;
	}
}
