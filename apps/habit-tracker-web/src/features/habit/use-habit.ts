import { useBroadcastSync } from "@/features/habit/use-broadcast-sync";
import type { DateType } from "@/lib/date";
import type { HabitInputModel } from "@/model/habit/habit-input-model";
import { HabitService } from "@/model/habit/habit-service";
import type { HabitViewModel } from "@/model/habit/habit-view-model";
import { LocalStorageHabitRepository } from "@/model/habit/local-storage-habit-repository";
import { shallowRef, watchEffect, type Ref } from "vue";

const service = new HabitService(new LocalStorageHabitRepository());

export const useHabits = (date: Ref<DateType>) => {
	const sync = useBroadcastSync("habit-sync");

	sync.subscribe(({ type }) => {
		if (type === "habits-updated") {
			refresh();
		}
	});

	const habits = shallowRef<HabitViewModel[]>([]);
	const habitsDueOnDate = shallowRef<HabitViewModel[]>([]);

	const refresh = () => {
		habits.value = service.getHabits(date.value);
		habitsDueOnDate.value = service.getHabitsDueOnDate(date.value);
	};

	watchEffect(refresh);

	const doSync = () => {
		sync.postMessage({ type: "habits-updated" });
	};

	const addHabit = (item: HabitInputModel) => {
		service.addHabit(item);
		doSync();
		refresh();
	};

	const deleteHabit = (id: string) => {
		service.deleteHabit(id);
		doSync();
		refresh();
	};

	const editHabit = (id: string, habit: HabitInputModel) => {
		service.editHabit(id, habit);
		doSync();
		refresh();
	};

	const toggleActiveStatus = (id: string, date: DateType) => {
		service.toggleStatus(id, date);
		doSync();
		refresh();
	};

	const toggleHabitCompletion = (id: string, date: DateType) => {
		service.toggleCompletion(id, date);
		doSync();
		refresh();
	};

	const canToggleCompletion = (id: string, date: DateType) =>
		service.canToggleCompletion(id, date);

	const canToggleStatus = (id: string, date: DateType) =>
		service.canToggleStatus(id, date);

	return {
		habits,
		habitsDueOnDate,
		addHabit,
		deleteHabit,
		editHabit,
		toggleActiveStatus,
		toggleHabitCompletion,
		canToggleCompletion,
		canToggleStatus,
	};
};
