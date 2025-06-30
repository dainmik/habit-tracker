import { trpc } from "@/app/config";
import { useBroadcastSync } from "@/composables/use-broadcast-sync";
import type { DateType } from "@repo/date";
import { convertDateToIso } from "@repo/date";
import type { HabitDTO, HabitInputModel } from "@repo/habit-tracker-data/model";
import { shallowRef, watchEffect, type Ref } from "vue";

export const useHabits = (date: Ref<DateType>) => {
	const sync = useBroadcastSync("habit-sync");

	sync.subscribe(({ type }) => {
		if (type === "habits-updated") {
			void refresh();
		}
	});

	const habits = shallowRef<HabitDTO[]>([]);
	const habitsDueOnDate = shallowRef<HabitDTO[]>([]);

	const refresh = async () => {
		habits.value = await trpc.habits.getAll.query(convertDateToIso(date.value));
		habitsDueOnDate.value = await trpc.habits.getDue.query(
			convertDateToIso(date.value),
		);
	};

	watchEffect(() => {
		void refresh();
	});

	const doSync = () => {
		sync.postMessage({ type: "habits-updated" });
	};

	const addHabit = async (item: HabitInputModel) => {
		await trpc.habits.add.mutate(item);
		doSync();
		await refresh();
	};

	const deleteHabit = async (id: string) => {
		await trpc.habits.delete.mutate({ id });
		doSync();
		await refresh();
	};

	const editHabit = async (id: string, habit: HabitInputModel) => {
		await trpc.habits.edit.mutate({ id, habit });
		doSync();
		await refresh();
	};

	const toggleActiveStatus = async (id: string, date: DateType) => {
		await trpc.habits.toggleStatus.mutate({ id, date: convertDateToIso(date) });
		doSync();
		await refresh();
	};

	const toggleHabitCompletion = async (id: string, date: DateType) => {
		await trpc.habits.toggleCompletion.mutate({
			id,
			date: convertDateToIso(date),
		});
		doSync();
		await refresh();
	};

	const canToggleCompletion = async (id: string, date: DateType) =>
		await trpc.habits.canToggleCompletion.query({
			id,
			date: convertDateToIso(date),
		});

	const canToggleStatus = async (id: string, date: DateType) =>
		await trpc.habits.canToggleStatus.query({
			id,
			date: convertDateToIso(date),
		});

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
