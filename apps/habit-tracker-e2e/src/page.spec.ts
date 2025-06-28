import { expect, test } from "@playwright/test";

test("User can visit the home page via root URL", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("link", { name: "Habit Tracker" })).toBeVisible();
});

test("User can visit the home page via URL with a specific date", async ({
	page,
}) => {
	await page.goto("/day/1970-01-01");
	await expect(page.getByRole("link", { name: "Habit Tracker" })).toBeVisible();
});

test("User is shown a Page Not Found page when visit via an invalid URL", async ({
	page,
}) => {
	await page.goto("/day/1nvaI1d");
	await expect(page.getByTestId("page-not-found")).toBeVisible();
});
