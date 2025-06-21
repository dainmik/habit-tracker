import { Entity } from "#model/common/domain/entity";

export abstract class Aggregate<EntityProps> extends Entity {
	abstract exportedState(): EntityProps;

	toDTO<T>(factory: (props: EntityProps) => T): T {
		return factory(this.exportedState());
	}
}
