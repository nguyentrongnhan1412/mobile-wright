import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests',
  reporter: [['html'], ['allure-playwright', { resultsDir: 'allure-results' }]],
  platform: 'android',
  bundleId: 'com.saucelabs.mydemoapp.android',
  installApps: './app.apk',
  autoAppLaunch: true,
  fullyParallel: true,
  timeout: 60_000,
  use: {
    actionTimeout: 15_000,
    appLaunchTimeout: 40_000,
  },
});
