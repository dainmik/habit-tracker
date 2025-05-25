export const ICONS = {
	arrowHeadRight: "ep:arrow-right-bold",
	check: "radix-icons:check",
	cross: "radix-icons:cross-1",
	delete: "ic:baseline-delete",
	edit: "ic:baseline-edit",
	moon: "radix-icons:moon",
	pause: "iconoir:pause-solid",
	resume: "iconoir:play-solid",
	sun: "radix-icons:sun",
} as const;

export type IconName = keyof typeof ICONS;
