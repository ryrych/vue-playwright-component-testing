import { test, expect } from '@playwright/experimental-ct-vue';
import myModal from './myModal.vue';

test.describe('myModal', () => {
  test('visibility', async ({ mount }) => {
    const modalWithWrapper = await mount(myModal);
    const modal = modalWithWrapper.locator('..').locator('[data-test="myModal"]');

    await expect(modal).not.toBeVisible();

    await modalWithWrapper.update({
      props: { isOpen: true },
    });

    await expect(modal).toBeVisible();
  });
});

test.describe('myModal - integration', () => {
  test('modal is closed after button is clicked', async ({ mount }) => {
    const modalWithWrapper = await mount(myModal, {
      props: {
        isOpen: true
      }
    });
    const modal = modalWithWrapper.locator('..').locator('[data-test="myModal"]');
    const button = modal.locator('[data-test="myButton"]');

    await button.click();

    await expect(modal).not.toBeVisible();
  });
});

test.describe(
  'myModal - Visual tests',
  {
    tag: '@visual-tests',
  },
  () => {
    test('when modal is open', async ({ mount }) => {
      const modalWithWrapper = await mount(myModal, {
        props: { isOpen: true },
      });
      const modal = modalWithWrapper.locator('..').locator('[data-test="myModal"]');
      await expect.soft(modal).toHaveScreenshot({
        animations: 'disabled',
      });
    });
  },
);
