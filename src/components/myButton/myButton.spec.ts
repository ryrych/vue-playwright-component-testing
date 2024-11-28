import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import myButton from './myButton.vue';

describe('myButton', () => {
  describe('label', () => {
    it('Contains text', () => {
      const wrapper = shallowMount(myButton, {
        props: {
          label: "Click me!"
        }
      });

      expect(wrapper.text()).toContain('Click me!');
    });
  });
});
