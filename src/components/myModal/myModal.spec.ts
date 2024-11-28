import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import myModal from './myModal.vue';
import myButton from '../myButton/myButton.vue';

const getComponent = (propsData = {}) => {
  return shallowMount(myModal, {
    global: {
      stubs: {
        teleport: true
      },
    },
    props: {
      ...propsData,
    }
  });
}

describe('myModal', () => {
  describe('visibility', () => {
    it('is not visible by default', () => {
      const wrapper = getComponent();
      const modal = wrapper.find('[data-test="myModal"]');

      expect(modal.exists()).toBe(false);
    });

    it('is visible when `isOpen` is true', () => {
      const wrapper = getComponent({
        isOpen: true
      });
      const modal = wrapper.find('[data-test="myModal"]');

      expect(modal.exists()).toBe(true);
    });
  });

  describe('integration', () => {
    it('modal is closed after button is clicked', async () => {
      const wrapper = getComponent({
        isOpen: true
      });
      const modal = wrapper.find('[data-test="myModal"]');
      const button = wrapper.findComponent(myButton)

      await button.trigger('click');

      expect(modal.exists()).toBe(true);
    });
  });
});
