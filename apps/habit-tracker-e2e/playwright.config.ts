import { defineConfig, devices } from "@playwright/test";
import { env } from "./env.ts";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// @ts-expect-error Config object relies on non-exact optional properties for flexibility. We do not control 3rd-party types. See: https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes
// eslint-disable-next-line import-x/no-default-export
export default defineConfig({
	testDir: "./src",
	/* Maximum time one test can run for. */
	timeout: 15 * 1000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 5000,
	},
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!env.CI,
	fullyParallel: true,
	retries: env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [["html", { open: "never" }]],
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: `${env.HABIT_TRACKER_WEB_SCHEMA}${env.HABIT_TRACKER_WEB_HOST}:${env.HABIT_TRACKER_WEB_PORT}`,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",

		/* Only on CI systems run the tests headless */
		// headless: !!env.CI,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
		},
		{
			name: "firefox",
			use: {
				...devices["Desktop Firefox"],
			},
		},
		{
			name: "webkit",
			use: {
				...devices["Desktop Safari"],
			},
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: {
		//     ...devices['Pixel 5'],
		//   },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: {
		//     ...devices['iPhone 12'],
		//   },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: {
		//     channel: 'msedge',
		//   },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: {
		//     channel: 'chrome',
		//   },
		// },
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	// webServer: {
	// 	/**
	// 	 * Use the dev server by default for faster feedback loop.
	// 	 * Use the preview server on CI for more realistic testing.
	// 	 * Playwright will re-use the local server if there is already a dev-server running.
	// 	 */
	// 	command: env.CI
	// 		? "pnpm --filter @repo/habit-tracker-web preview"
	// 		: "pnpm --filter @repo/habit-tracker-web dev",
	// 	port: env.HABIT_TRACKER_WEB_PORT,
	// 	reuseExistingServer: !env.CI,
	// },
});
