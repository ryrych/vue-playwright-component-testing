import { test, expect } from '@playwright/experimental-ct-vue';
import myButton from './myButton.vue';

test.describe('myButton', () => {
  test('Contains text', async ({ mount }) => {
    const component = await mount(myButton, { props: { label: 'Click me!' } });

    await expect(component).toContainText('Click me!');
  });
});

