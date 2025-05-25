import { expect, Page, test } from "@playwright/test";

test("Visits the app root url", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator("a")).toHaveText("Habit Tracker");
});

test.describe.configure({ mode: "parallel" });

const addHabit = async (page: Page, name: string) => {
	await page.getByRole("button", { name: "Add Habit" }).click();
	await page.getByLabel("Name").fill(name);
	await page.getByLabel("Start date").fill("2025-05-30");
	await page.getByLabel("Repeat").click();
	await page.getByRole("button", { name: "OK" }).click();
};

test.describe("No Habits available", () => {
	test("Should show empty state", async ({ page }) => {
		await page.goto("/");

		await expect(page.locator("text=No habits for today!")).toBeVisible({
			timeout: 2000,
		});
	});
});

test.describe("Habit Tracking App", () => {
	const habitName = "Test Habit";

	test.beforeEach(async ({ page }) => {
		await page.goto("/day/2025-05-30");
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

	// test("Should toggle habit completion", async ({ page }) => {
	// 	await page.getByRole("button", { name: habitName }).click();
	// 	await page.locator("button#toggle-completion").click();
	// 	// check icon state or log messages as needed
	// });

	test("Should edit the habit", async ({ page }) => {
		await addHabit(page, habitName);
		await page.getByRole("button", { name: habitName }).click();
		await page.getByRole("button", { name: "Edit habit" }).click();

		const habitNewName = "Updated Habit";

		await page.getByLabel("Name").fill(habitNewName);
		await page.getByRole("button", { name: "OK" }).click();

		await expect(page.locator(`text=${habitNewName}`)).toBeVisible();
	});

	// test("Should pause and resume the habit", async ({ page }) => {
	// 	await page.getByText("Updated Habit").click();
	// 	await page.locator("button").nth(2).click(); // toggle status
	// 	// Confirm opacity or icon change
	// });

	// test("Should delete the habit", async ({ page }) => {
	// 	await page.getByText("Updated Habit").click();
	// 	await page.locator("button").nth(3).click();

	// 	await expect(page.locator("text=Updated Habit")).not.toBeVisible();
	// });

	// test("Should change selected date via DaySelect and update habits", async ({ page }) => {
	// 	// Assumes DaySelect emits `@date-selected` that updates URL or selectedDay
	// 	// This example assumes a route like `/habits/:iso`
	// 	const tomorrow = new Date();
	// 	tomorrow.setDate(tomorrow.getDate() + 1);
	// 	const iso = tomorrow.toISOString().split("T")[0];

	// 	await page.goto(`/habits/${iso}`);

	// 	// Should either show new habits or empty state
	// 	await expect(page.locator("text=No habits for today!")).toBeVisible({ timeout: 2000 }).catch(() => {});
	// });
});
