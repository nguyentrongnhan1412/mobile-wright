import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests',
  reporter: [['html'], ['allure-playwright', { resultsDir: 'allure-results' }]],
  platform: 'android',
  bundleId: 'com.saucelabs.mydemoapp.android',
  installApps: './app.apk',
  autoAppLaunch: true,
  fullyParallel: true,
  // Must comfortably exceed appLaunchTimeout + device/agent setup overhead,
  // not just the test body — on a cold CI emulator, agent install/connect
  // alone can take 40-60s before the first test action even runs.
  timeout: 120_000,
  use: {
    actionTimeout: 15_000,
    appLaunchTimeout: 40_000,
  },
});
