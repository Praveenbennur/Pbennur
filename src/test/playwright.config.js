// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000, // global test timeout of 60 seconds
  use: {
    headless: false,
    actionTimeout: 30000,      // timeout for each action
    navigationTimeout: 30000,  // timeout for navigation methods
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // The other projects remain commented out
  ],
});