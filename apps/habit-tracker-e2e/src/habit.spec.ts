import { expect, type Page, test } from "@playwright/test";
import { convertDateToIso, currentDate } from "@repo/date";

const addHabit = async (page: Page, name: string) => {
	await test.step("Add a new habit", async () => {
		await page.getByRole("button", { name: "Add Habit" }).click();
		await page.getByLabel("Name").fill(name);
		await page.getByLabel("Repeat", { exact: true }).click();
		await page.getByRole("button", { name: "Save changes" }).click();
	});
};

const removeHabit = async (page: Page, name: string) => {
	await test.step("Remove habit", async () => {
		const habitButton = page.getByRole("button", { name });
		const deleteButton = page.getByRole("button", { name: "Delete habit" });

		if (!(await deleteButton.isVisible())) {
			await habitButton.click();
		}
		await expect(deleteButton).toBeVisible();
		await deleteButton.click();
	});
};

const clickOnHabit = async (page: Page, name: string) => {
	await page.getByRole("button", { name }).click();
};

/**
 * TODO: If we start running the tests right before midnight and the tests
 * that test functionality that depends on whether it is yesterday or today
 * have not run yet, they may produce inconsistent results.
 */
const TODAYS_DATE = convertDateToIso(currentDate());

test.describe("Habit Tracking App", () => {
	let habitName: string;

	test.beforeEach(async ({ page }) => {
		await test.step(`Visit page for ${TODAYS_DATE}`, async () => {
			habitName = `Test Habit ${crypto.randomUUID()}`;
			await page.goto(`/day/${TODAYS_DATE}`);
		});
	});

	test.afterEach(async ({ page }) => {
		await test.step("Clean up habit after test", async () => {
			if (await page.locator(`text=${habitName}`).isVisible()) {
				await removeHabit(page, habitName);
			}
		});
	});

	test("Creates and deletes a habit", async ({ page }) => {
		await addHabit(page, habitName);

		await expect(page.locator(`text=${habitName}`)).toBeVisible();

		await removeHabit(page, habitName);

		await expect(page.locator(`text=${habitName}`)).not.toBeVisible();
	});

	test("Expands habit and shows action buttons", async ({ page }) => {
		await addHabit(page, habitName);

		await clickOnHabit(page, habitName);

		await expect(page.getByLabel("Mark habit as complete")).toBeVisible();
		await expect(page.getByLabel("Edit habit")).toBeVisible();
		await expect(page.getByLabel("Delete habit")).toBeVisible();
	});

	test("Edits the habit", async ({ page }) => {
		await addHabit(page, habitName);
		await clickOnHabit(page, habitName);
		await page.getByRole("button", { name: "Edit habit" }).click();
		habitName = `Updated Habit ${crypto.randomUUID()}`;
		await page.getByLabel("Name").fill(habitName);

		await page.getByRole("button", { name: "Save changes" }).click();

		await clickOnHabit(page, habitName);
		await expect(page.locator(`text=${habitName}`)).toBeVisible();
	});

	test("Toggles habit completion status", async ({ page }) => {
		await addHabit(page, habitName);
		await clickOnHabit(page, habitName);

		await page.getByRole("button", { name: "Mark habit as complete" }).click();

		await expect(
			page.getByRole("button", { name: "Mark habit as incomplete" }),
		).toBeVisible();

		await page
			.getByRole("button", { name: "Mark habit as incomplete" })
			.click();

		await expect(
			page.getByRole("button", { name: "Mark habit as complete" }),
		).toBeVisible();
	});

	test("Toggles habit active status", async ({ page }) => {
		await addHabit(page, habitName);
		await clickOnHabit(page, habitName);

		await page.getByRole("button", { name: "Mark habit as inactive" }).click();

		await expect(
			page.getByRole("button", { name: "Mark habit as active" }),
		).toBeVisible();

		await page.getByRole("button", { name: "Mark habit as active" }).click();

		await expect(
			page.getByRole("button", { name: "Mark habit as inactive" }),
		).toBeVisible();
	});
});
