import { expect, type Page, test } from "@playwright/test";

const currentDateISOString = new Date().toISOString().slice(0, 10);

test("Visits the app root url", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("link", { name: "Habit Tracker" })).toBeVisible();
});

test.describe.configure({ mode: "parallel" });

const addHabit = async (page: Page, name: string) => {
	await page.getByRole("button", { name: "Add Habit" }).click();
	await page.getByLabel("Name").fill(name);
	await page.getByLabel("Repeat").click();
	await page.getByRole("button", { name: "OK" }).click();
};

test.describe("No Habits available", () => {
	test("Should show empty state", async ({ page }) => {
		await page.goto("/");

		await expect(page.locator("text=No habits for this day!")).toBeVisible({
			timeout: 2000,
		});
	});
});

test.describe("Habit Tracking App", () => {
	const habitName = "Test Habit";

	test.beforeEach(async ({ page }) => {
		await page.goto(`/day/${currentDateISOString}`);
	});

	test("Should open Add Habit drawer and create a habit", async ({ page }) => {
		await addHabit(page, habitName);

		await expect(page.locator(`text=${habitName}`)).toBeVisible();
	});

	test("Should expand habit and show action icons", async ({ page }) => {
		await addHabit(page, habitName);

		await page.getByRole("button", { name: habitName }).click();

		await expect(page.getByLabel("Mark habit as complete")).toBeVisible();
		await expect(page.getByLabel("Mark habit as inactive")).toBeVisible();
		await expect(page.getByLabel("Edit habit")).toBeVisible();
		await expect(page.getByLabel("Delete habit")).toBeVisible();
	});

	test("Should edit the habit", async ({ page }) => {
		await addHabit(page, habitName);
		await page.getByRole("button", { name: habitName }).click();
		await page.getByRole("button", { name: "Edit habit" }).click();

		const habitNewName = "Updated Habit";

		await page.getByLabel("Name").fill(habitNewName);
		await page.getByRole("button", { name: "OK" }).click();

		await expect(page.locator(`text=${habitNewName}`)).toBeVisible();
	});
});
