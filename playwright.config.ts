import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['list'], ['github'], ['html']] : [['list'], ['html']],
  use: {
    baseURL: 'http://127.0.0.1:4000',
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    proxy: process.env.HTTP_PROXY ? { server: process.env.HTTP_PROXY } : undefined,
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },
  ],
  webServer: {
    command: 'bundle exec jekyll serve --port 4000',
    url: 'http://127.0.0.1:4000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
