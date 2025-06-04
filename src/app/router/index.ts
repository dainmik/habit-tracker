import HabitPage from "@/app/pages/habit-page.vue";
import NotFoundPage from "@/app/pages/not-found-page.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: HabitPage,
		},
		{
			path: "/day/:date",
			component: HabitPage,
		},
		{
			name: "PageNotFound",
			path: "/:pathMatch(.*)*",
			component: NotFoundPage,
		},
	],
});
