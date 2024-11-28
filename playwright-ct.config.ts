import { defineConfig, devices } from '@playwright/experimental-ct-vue';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testMatch: 'src/**/*.component.spec.ts',
  /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
  snapshotDir: './__visual-tests-snapshots__',
  /* Maximum time one test can run for. */
  timeout: 10 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Port to use for Playwright component endpoint. */
    ctPort: 3100,
    ctViteConfig: {
      plugins: [
        vue(),
        AutoImport({
          imports: ['vue'],
          dts: 'src/auto-imports.d.ts',
          eslintrc: {
            enabled: true,
          },
        }),
        Components({
          extensions: ['vue', 'svg'],
        }),
      ],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
    },
  },

  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,

    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 10,
    },

    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the
      // total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.1,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
